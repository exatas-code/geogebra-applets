# Guia: Como Adicionar Novos Applets via Chat da IA 🚀

Este guia explica como adicionar novos applets interativos do GeoGebra ao seu portal de forma simples, usando apenas o chat da IA e alguns comandos rápidos no terminal.

---

## Fluxo de Trabalho (3 Passos Simples)

### Passo 1: Solicitar no Chat
Envie o link do GeoGebra no chat da IA e peça para adicioná-lo. 

**Exemplo de Mensagem:**
> *"Adicione este applet ao meu catálogo: https://www.geogebra.org/m/abcde123"*

A IA vai automaticamente:
1. Extrair os metadados (Título, Autor, URL do iframe, tags sugeridas, etc.).
2. Adicionar o novo registro no arquivo local `data/applets.json`.
3. Executar o script de validação para garantir que não haja erros de sintaxe ou IDs duplicados.
4. Avisar você que os arquivos foram gerados e validados com sucesso.

---

### Passo 2: Enviar para o GitHub (Terminal)
Abra o seu terminal na pasta do projeto e envie a alteração do catálogo:

```bash
# 1. Adiciona o catálogo atualizado
git add data/applets.json

# 2. Cria o commit identificando a adição
git commit -m "feat: adiciona novo applet ao catalogo"

# 3. Envia para o GitHub
git push origin main
```

---

### Passo 3: Publicar a nova versão para atualizar o Site
Para que a CDN (jsDelivr) atualize o arquivo no site de produção, você precisa criar uma nova tag de versão incremental (ex: se a última foi `v1.0.0`, a próxima será `v1.0.1`):

```bash
# Cria e envia a nova tag de versão (substitua pelo número da nova versão)
git tag -a v1.0.1 -m "Adiciona novo applet"
git push origin v1.0.1
```

> [!NOTE]
> Como o seu template XML do Blogger já aponta para a versão `@v1`, o site se atualizará sozinho em poucos minutos buscando a nova tag `v1.0.1` do GitHub. **Você não precisa mexer no código do Blogger!**

---

## 🛠️ Como checar a versão atual antes de subir a nova?
Caso não se lembre de qual foi a última versão/tag que criou, basta rodar este comando no terminal para listar todas as suas tags criadas em ordem:

```bash
git tag --sort=v:refname
```
Se a última listada for `v1.0.0`, a próxima que você deve subir é a `v1.0.1`.
