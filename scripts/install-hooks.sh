#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# install-hooks.sh
# Installs git hooks for this project (currently: pre-commit secret scan).
#
# Usage:
#   bash scripts/install-hooks.sh
#
# Requires:  gitleaks  (https://github.com/gitleaks/gitleaks)
#   macOS:   brew install gitleaks
#   Linux:   see https://github.com/gitleaks/gitleaks#installing
# ─────────────────────────────────────────────────────────────
set -euo pipefail

RED='\033[0;31m'
YLW='\033[0;33m'
GRN='\033[0;32m'
RST='\033[0m'

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOKS_DIR="$(git rev-parse --git-dir)/hooks"

# ── Dependency check ──────────────────────────────────────────
if ! command -v gitleaks &>/dev/null; then
  echo -e "${RED}✗ gitleaks is not installed.${RST}"
  echo ""
  echo "  Install it first:"
  echo "    macOS:  brew install gitleaks"
  echo "    Linux:  https://github.com/gitleaks/gitleaks#installing"
  echo ""
  echo "  Then re-run:  bash scripts/install-hooks.sh"
  exit 1
fi

GITLEAKS_VER=$(gitleaks version 2>/dev/null || echo "unknown")
echo -e "${GRN}✓ gitleaks found${RST} ($GITLEAKS_VER)"

# ── Write pre-commit hook ─────────────────────────────────────
PRE_COMMIT="$HOOKS_DIR/pre-commit"

# Back up existing hook (if not already ours)
if [[ -f "$PRE_COMMIT" ]] && ! grep -q "gitleaks" "$PRE_COMMIT" 2>/dev/null; then
  cp "$PRE_COMMIT" "${PRE_COMMIT}.bak"
  echo -e "${YLW}⚠ Existing pre-commit hook backed up → ${PRE_COMMIT}.bak${RST}"
fi

cat > "$PRE_COMMIT" << 'HOOK'
#!/usr/bin/env bash
# pre-commit: scan staged files for secrets with gitleaks
# Installed by scripts/install-hooks.sh — do not edit manually.

CONFIG="$(git rev-parse --show-toplevel)/.gitleaks.toml"

if ! command -v gitleaks &>/dev/null; then
  echo "⚠  gitleaks not found — secret scan skipped."
  echo "   Install: brew install gitleaks"
  echo "   Then run: bash scripts/install-hooks.sh"
  exit 0   # warn but don't block
fi

echo "🔍 Scanning staged files for secrets…"

# --staged scans only the files in the index (not the whole repo)
if ! gitleaks protect --staged --config="$CONFIG" --redact -v; then
  echo ""
  echo "❌ Secret(s) detected in staged changes."
  echo "   Remove or rotate the secret, then commit again."
  echo ""
  echo "   To skip this check (⚠ not recommended):"
  echo "     git commit --no-verify"
  exit 1
fi

echo "✅ No secrets detected in staged files."
HOOK

chmod +x "$PRE_COMMIT"
echo -e "${GRN}✓ pre-commit hook installed →${RST} $PRE_COMMIT"
echo ""
echo "Staged files will be scanned for secrets on every 'git commit'."
echo "The CI pipeline also scans the full repository history before deploying."
