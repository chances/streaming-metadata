export interface HashConfig {
  [key: string]: string | true
}

function parseConfigFromHash(): HashConfig {
  const hash = window.location.hash.substring(1);
  return hash.split('&').reduce(function (result: HashConfig, item) {
    var parts = item.split('=');
    result[parts[0]] = parts[1] || true;
    return result;
  }, {});
}

const config = parseConfigFromHash()

export function flag(key: string) {
  return config[key] === true
}

export function value(key: string): string | undefined {
  const value = config[key]
  if (value && typeof value === 'string') return value
}

export function url(key: string) {
  const entry = config[key]
  if (entry && typeof entry === 'string') {
    return new URL(entry)
  }
}
