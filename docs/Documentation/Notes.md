# Installation Notes

## Tjeck intallation

### Check .NET tools
`dotnet tool list --global`

### Check Playwright version
`playwright --version`

### Check OS information
`cat /etc/os-release`

### Verify Chromium browser installation
`playwright install --with-deps chromium --dry-run`

### Check if Chromium binary exists
`ls -la ~/.cache/ms-playwright/chromium-*/chrome-linux/chrome 2>/dev/null || echo "Chromium not found in cache"`

```sh
PRETTY_NAME="Ubuntu 24.04.3 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04.3 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=noble
LOGO=ubuntu-logo
```
## Installation af Headless browser

Efter containernen er startet, kan vi installere en headless browser:
`playwright install --with-deps chromium`


