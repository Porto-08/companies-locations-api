export function generateRandomCpnj(): string {
  const cnpj = Math.floor(Math.random() * 99999999999999);
  return cnpj.toString();
}
