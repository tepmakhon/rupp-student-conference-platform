import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const parse = (file: string) => ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
const app = parse(path.join(root, "src/app.ts"));
const imports = new Map<string, string>();
const mounts: { prefix: string; file: string }[] = [];
app.forEachChild((node) => {
  if (ts.isImportDeclaration(node) && node.importClause?.name && ts.isStringLiteral(node.moduleSpecifier)) {
    imports.set(node.importClause.name.text, path.resolve(root, "src", node.moduleSpecifier.text.replace(/\.js$/, ".ts")));
  }
  if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)) {
    const call = node.expression;
    if (call.expression.getText(app) === "app.use" && call.arguments.length === 2 && ts.isStringLiteral(call.arguments[0]) && ts.isIdentifier(call.arguments[1])) {
      const file = imports.get(call.arguments[1].text);
      if (file && /\.routes?\.ts$/.test(file)) mounts.push({ prefix: call.arguments[0].text, file });
    }
  }
});
const rows: string[] = [];
for (const { prefix, file } of mounts) {
  const source = parse(file);
  source.forEachChild((node) => {
    if (!ts.isExpressionStatement(node) || !ts.isCallExpression(node.expression)) return;
    const call = node.expression;
    const method = call.expression.getText(source).match(/^router\.(get|post|put|patch|delete)$/)?.[1];
    if (!method || !ts.isStringLiteral(call.arguments[0])) return;
    const route = (prefix + call.arguments[0].text).replace(/\/$/, "");
    const middleware = call.arguments.slice(1).map((argument) => argument.getText(source));
    const roleCheck = middleware.find((item) => item.startsWith("rbac("));
    const roles = roleCheck ? [...roleCheck.matchAll(/"(\w+)"/g)].map((match) => match[1]).join(", ") : "—";
    const auth = middleware.includes("authMiddleware") ? "JWT" : middleware.includes("optionalAuth") ? "Optional JWT; pending details require owner/admin" : "Public";
    const schema = middleware.find((item) => item.startsWith("validate("))?.replace(/\s+/g, " ").slice(0, 100) || "Service/controller validation";
    rows.push(`| ${method.toUpperCase()} | \`${route}\` | ${auth} | ${roles} | ${schema.replace(/\|/g, "\\|")} |`);
  });
}
const output = `# API map\n\nGenerated from mounted Express routers by \`npm run docs:api\` in backend. Routes and middleware are authoritative; request/response contracts are in the linked module controllers, validation schemas and services. JSON responses use \`{ success, message, data }\`; IDs serialize as strings. CSV/PDF endpoints return files.\n\n${rows.length} mounted module endpoints. Swagger is at \`/api/docs\`; the health response is at \`/\`.\n\n| Method | Path | Authentication | Roles | Validation |\n| --- | --- | --- | --- | --- |\n${rows.join("\n")}\n`;
const destination = path.resolve(root, "../docs/api-map.md");
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, output);
console.log(`Wrote ${rows.length} endpoints to docs/api-map.md`);
