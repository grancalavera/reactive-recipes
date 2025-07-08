FROM node:24-bookworm

# Timezone configuration
# Allow customization of container timezone via build arg
ARG TZ
ENV TZ="$TZ"

# System Dependencies: Install essential development tools and security packages
# This includes tools for development, networking, and firewall management
RUN apt update && apt install -y \
  less \
  git \
  procps \
  sudo \
  fzf \
  zsh \
  man-db \
  unzip \
  gnupg2 \
  gh \
  iptables \
  ipset \
  iproute2 \
  dnsutils \
  aggregate \
  jq


# NPM Global Directory: Configure npm to use a writable global directory
# This prevents permission issues when installing global packages
RUN mkdir -p /usr/local/share/npm-global && \
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Bash History Persistence: Configure persistent command history
# History is stored in a volume-mounted directory to survive container restarts
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  && mkdir /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R $USERNAME /commandhistory

# DevContainer Environment: Set flag to indicate we're in a development container
ENV DEVCONTAINER=true

# Directory Setup: Create workspace and configuration directories
# These directories are used for project files and Claude configuration
RUN mkdir -p /workspace /home/node/.claude && \
  chown -R node:node /workspace /home/node/.claude

WORKDIR /workspace

# Git Delta: Install enhanced diff viewer for better git experience
# Delta provides syntax highlighting and side-by-side diffs
RUN ARCH=$(dpkg --print-architecture) && \
  wget "https://github.com/dandavison/delta/releases/download/0.18.2/git-delta_0.18.2_${ARCH}.deb" && \
  sudo dpkg -i "git-delta_0.18.2_${ARCH}.deb" && \
  rm "git-delta_0.18.2_${ARCH}.deb"

# Security: Switch to non-root user for safer operation
# All subsequent commands run as the 'node' user
USER node

# NPM Configuration: Set up global package installation
# Configure npm to use our writable global directory
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

# Shell Configuration: Use zsh as the default shell
# Provides better interactive experience than bash
ENV SHELL=/bin/zsh

# Zsh Setup: Install and configure zsh with powerline10k theme
# Provides enhanced terminal experience with git integration and fuzzy finding
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.0/zsh-in-docker.sh)" -- \
  -p git \
  -p fzf \
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  -x

# Claude Code: Install the main application
# This is the primary tool that users will interact with
RUN npm install -g @anthropic-ai/claude-code


# Firewall Security: Set up network restriction script
# Copy the firewall initialization script and configure sudo access
COPY init-firewall.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/init-firewall.sh && \
  echo "node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/node-firewall && \
  chmod 0440 /etc/sudoers.d/node-firewall
USER node
