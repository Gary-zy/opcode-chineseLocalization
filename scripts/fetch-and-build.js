import { spawn, spawnSync } from 'child_process';
import process from 'process';

console.log("Warning: Original scripts/fetch-and-build.js was missing. Using fallback build script.");

// Check if cargo is available
const cargoCheck = spawnSync('cargo', ['--version']);
if (cargoCheck.error) {
    console.error("\n❌ Error: Rust/Cargo is not installed or not in PATH.");
    console.error("To build this application, you need to install Rust.");
    console.error("Please run the following command to install Rust:");
    console.error("  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh");
    console.error("\nOr visit https://rustup.rs/ for more information.\n");
    process.exit(1);
}

const args = process.argv.slice(2);
console.log("Arguments received:", args);

// We will just run 'bun run tauri build'
// We can pass arguments if needed, but for now let's keep it simple.

const buildCommand = 'bun';
const buildArgs = ['run', 'tauri', 'build'];

console.log(`Executing: ${buildCommand} ${buildArgs.join(' ')}`);

const child = spawn(buildCommand, buildArgs, { stdio: 'inherit' });

child.on('close', (code) => {
    process.exit(code);
});
