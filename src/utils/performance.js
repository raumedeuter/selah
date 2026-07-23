export function getPerformanceProfile() {
  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;

  // Older / low-end devices
  if (memory <= 2 || cores <= 4) {
    return "lite";
  }

  // Modern phones & desktops
  return "premium";
}