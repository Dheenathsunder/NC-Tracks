export function generatePriorAuthCode(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');
  return `PA-${year}-${random}`;
}
