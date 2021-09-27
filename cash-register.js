function checkCashRegister(price, cash, cid) {

  // Dicionário de valores das notas e moedas.
  let values = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  };

  // Variável que armazena o troco devido em notas e moedas.
  let result = [];

  // Variável que armazena o total da caixa registradora.
  let totalCid = 0;

  // Variável que armazena o valor do troco devido.
  let change = cash - price;

  // Ordena as notas e moedas da caixa registradora do maior valor para o menor.
  let sortedCid = cid.slice('').sort((a, b) => values[b[0]] - values[a[0]]);

  // Percorre as notas/moedas da caixa registradora.
  for (let i = 0; i < sortedCid.length; i++) {

    // Constante que armazena o nome da moeda/nota.
    const coin = sortedCid[i][0];

    // Constante que armazena o valor da moeda/nota.
    const value = values[coin];

    // Variável que armazena a quantidade de dinheiro disponível da moeda/nota.
    let quantity = sortedCid[i][1];

    // Total de troca da moeda/nota.
    let total = 0;

    // Calcula o total da caixa registradora. Será usado no final para veriricar a necessidade fechar o caixa.
    totalCid += parseFloat((totalCid + quantity).toFixed(2));

    // Enquanto o valor da moeda/nota for menor ou igual ao troco e a quantidade e troco devido for maior que zero.
    while (value <= change && quantity > 0 && change > 0) {

      // Diminui a quantidade de troco devido e de dinheiro da moeda disponível no caixa.
      change = parseFloat((change - value)).toFixed(2);
      quantity = parseFloat((quantity - value)).toFixed(2);

      // Armazena o total de troco devido na moeda/nota.
      total = parseFloat((total + value).toFixed(2));
    }

    // Se o total de troco devido na moeda/nota for maior que zero, então adiciona o troco.
    if (total > 0) {
      result.push([coin, total]);
    }
  }

  // Se restou troco a devolver, então os fundos não foram suficientes.
  if (change > 0)
    return { status: "INSUFFICIENT_FUNDS", change: [] };

  // Se o troco for igual ao total da caixa registradora, caixa estará fechado.
  if ((cash - price) == totalCid)
    return { status: "CLOSED", change: cid }

  // Caso não tenha restado troco e ainda tenha dinheiro na caixa registradora, o caixa continua aberto.
  return { status: "OPEN", change: result }
}