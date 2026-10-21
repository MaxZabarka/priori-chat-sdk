// Copies the built SDK into a local priori-chat-ui checkout so UI changes can be tried before a publish.
// PRIORI_CHAT_UI overrides the default location, a sibling folder.
import { cpSync, existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ui = resolve(process.env.PRIORI_CHAT_UI ?? join(root, "../priori-chat-ui"));
const linked = join(ui, "node_modules/priori-chat-sdk");
if (!existsSync(linked)) {
  console.error(`No priori-chat-sdk in ${ui}/node_modules. Run pnpm install in the UI first, or set PRIORI_CHAT_UI.`);
  process.exit(1);
}
const target = realpathSync(linked);
cpSync(join(root, "dist"), join(target, "dist"), { recursive: true });
cpSync(join(root, "src"), join(target, "src"), { recursive: true });
const pkg = JSON.parse(readFileSync(join(target, "package.json"), "utf8"));
pkg.version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
writeFileSync(join(target, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
console.log(`Copied SDK ${pkg.version} into ${target}`);
