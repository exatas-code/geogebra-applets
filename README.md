# GeoGebra Applets Catalog 📐

[![Validate Applets](https://github.com/exatas-code/geogebra-applets/actions/workflows/validate.yml/badge.svg)](https://github.com/exatas-code/geogebra-applets/actions/workflows/validate.yml)
[![CDN Status](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://www.jsdelivr.com/)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

Este repositório armazena o catálogo centralizado de **applets interativos do GeoGebra** utilizados no portal [geogebra.prof-edigleyalexandre.com](https://geogebra.prof-edigleyalexandre.com). 

Graças a esta arquitetura, os dados do catálogo foram totalmente desacoplados do template XML do site, garantindo um carregamento ultra-rápido do portal e facilitando a manutenção e adição de novos conteúdos.

---

## 🚀 Arquitetura & Como Funciona

1. **Catálogo em JSON**: Toda a lista com os mais de 150 applets está no arquivo estruturado `data/applets.json`.
2. **Entrega via CDN**: O site busca dinamicamente este arquivo utilizando a rede de entrega rápida do **jsDelivr** apontando para a tag de versão atual `@v1`.
3. **Validação Automática (CI/CD)**: Qualquer alteração no catálogo passa por uma verificação automatizada via GitHub Actions para certificar que a estrutura do JSON está 100% correta e que não existem IDs duplicados.

---

## 📁 Estrutura do Repositório

```text
├── .github/
│   └── workflows/
│       └── validate.yml       # Validação automatizada rodada pelo GitHub Actions
├── data/
│   ├── applets.json           # Banco de dados principal do catálogo (JSON)
│   └── applets.schema.json    # Modelo JSON Schema com regras de campos e formatos
├── docs/
│   └── sugerir-applet.png     # Imagem ilustrativa do guia de sugestões
├── scripts/
│   └── validate-applets.js    # Script em Node.js de validação estrutural do catálogo
├── .gitignore                 # Arquivos ignorados pelo controle de versão
├── COMO_ADICIONAR_APPLETS.md  # Guia técnico para adicionar novos applets via IA
├── SUGESTOES.md               # Guia explicativo sobre sugestão de novos materiais
└── README.md                  # Este arquivo de documentação principal
```

## 🛠️ Guias Rápidos

* **Para Colaboradores / Usuários**: Saiba como enviar novas indicações de materiais no [Guia de Sugestões de Applets](SUGESTOES.md).

---

## 📄 Licença

Os metadados e códigos de infraestrutura deste repositório estão disponíveis sob a licença do projeto. Os applets originais do GeoGebra referenciados seguem os termos de licença de seus respectivos autores (predominantemente **CC BY-SA**).
