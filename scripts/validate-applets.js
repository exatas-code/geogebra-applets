const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'data', 'applets.json');

console.log("Iniciando validação do catálogo de applets...");

if (!fs.existsSync(jsonPath)) {
  console.error(`Erro: Arquivo não encontrado em ${jsonPath}`);
  process.exit(1);
}

let applets;
try {
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  applets = JSON.parse(rawData);
} catch (err) {
  console.error("Erro: Falha ao analisar o arquivo JSON (sintaxe inválida).", err.message);
  process.exit(1);
}

if (!Array.isArray(applets)) {
  console.error("Erro: O catálogo deve ser um array JSON.");
  process.exit(1);
}

const totalApplets = applets.length;
console.log(`Carregados ${totalApplets} applets para validação.`);

const ids = new Set();
const categoriasValidas = new Set([
  "algebra",
  "geometria-plana",
  "geometria-espacial",
  "geometria-analitica",
  "calculo",
  "funcoes",
  "trigonometria",
  "estatistica"
]);
const niveisValidos = new Set(["fundamental", "medio", "superior"]);
let errorsCount = 0;

applets.forEach((app, index) => {
  const label = app.titulo || `Item ${index + 1}`;
  
  // 1. Campos obrigatórios
  const requiredFields = [
    "id", "titulo", "descricao", "categoria", "nivel", 
    "iframeSrc", "urlOriginal", "autorOriginal", "licenca", 
    "destaque", "tags"
  ];
  
  requiredFields.forEach(field => {
    if (app[field] === undefined || app[field] === null) {
      console.error(`[Erro][${label}]: Campo obrigatório "${field}" está ausente ou nulo.`);
      errorsCount++;
    }
  });

  if (app.id) {
    // 2. ID Único
    if (ids.has(app.id)) {
      console.error(`[Erro][${label}]: ID duplicado detectado: "${app.id}".`);
      errorsCount++;
    }
    ids.add(app.id);

    // 3. Formato do ID (slug)
    const idRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!idRegex.test(app.id)) {
      console.error(`[Erro][${label}]: ID "${app.id}" inválido. Deve conter apenas letras minúsculas, números e hífens.`);
      errorsCount++;
    }
  }

  // 4. Validação de Categoria
  if (app.categoria && !categoriasValidas.has(app.categoria)) {
    console.error(`[Erro][${label}]: Categoria "${app.categoria}" inválida. Valores permitidos: ${Array.from(categoriasValidas).join(", ")}`);
    errorsCount++;
  }

  // 5. Validação de Nível
  if (app.nivel && !niveisValidos.has(app.nivel)) {
    console.error(`[Erro][${label}]: Nível "${app.nivel}" inválido. Valores permitidos: ${Array.from(niveisValidos).join(", ")}`);
    errorsCount++;
  }

  // 6. Validação de URLs do GeoGebra
  if (app.iframeSrc && !app.iframeSrc.startsWith("https://www.geogebra.org/material/iframe/id/")) {
    console.error(`[Erro][${label}]: iframeSrc deve começar com "https://www.geogebra.org/material/iframe/id/". Valor atual: "${app.iframeSrc}"`);
    errorsCount++;
  }

  if (app.urlOriginal && !app.urlOriginal.startsWith("https://www.geogebra.org/m/")) {
    console.error(`[Erro][${label}]: urlOriginal deve começar com "https://www.geogebra.org/m/". Valor atual: "${app.urlOriginal}"`);
    errorsCount++;
  }

  // 7. Validação das tags
  if (app.tags) {
    if (!Array.isArray(app.tags) || app.tags.length === 0) {
      console.error(`[Erro][${label}]: O campo "tags" deve ser um array não vazio.`);
      errorsCount++;
    } else {
      app.tags.forEach((tag, idx) => {
        if (typeof tag !== 'string' || tag.trim() === "") {
          console.error(`[Erro][${label}]: Tag no índice ${idx} é inválida ou vazia.`);
          errorsCount++;
        }
      });
    }
  }
});

if (errorsCount > 0) {
  console.error(`\nValidação concluída com erro: foram detectados ${errorsCount} problemas no catálogo.`);
  process.exit(1);
} else {
  console.log("\nParabéns! O catálogo está 100% válido e consistente.");
  process.exit(0);
}
