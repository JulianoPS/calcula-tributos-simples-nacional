# 📊 Calcula Tributos Simples Nacional

Aplicação desenvolvida em **Angular 19** que realiza o cálculo de tributos no regime do **Simples Nacional**, considerando:
- **Fator R**
- **Anexos III e V**
- **Cálculo de pró-labore (INSS e IR) dos sócios**
- **Funcionários (INSS e IR)**
- **Despesas fixas (contador, aluguel, internet, água e energia)**
- **Encargos previdenciários (CPP, FGTS)**
- Comparativo com modelo **MEI**
---

## 🖼️ **Screenshots**
![Ação](./assets/screenshot.png)

### 🔸 Tela Principal
![Tela Principal](./assets/screenshot1.png)

### 🔸 Resultado do Cálculo
![Resultado do Cálculo](./assets/screenshot2.png)
---

## 🚀 **Tecnologias Utilizadas**
- ✅ Angular **19**
- ✅ Angular Material
- ✅ TypeScript
- ✅ RxJS
- ✅ SCSS
- ✅ ngx-mask
- ✅ ngx-currency
- ✅ API REST em **.NET 8** (backend próprio — não incluso neste repositório)
---

## 🏗️ **Funcionalidades Implementadas**
- 🔸 Cálculo automático do **Simples Nacional**
- 🔸 Avaliação do **Fator R** (Anexo III ou V)
- 🔸 Simulação de **encargos previdenciários** (CPP, FGTS)
- 🔸 Cálculo detalhado de **INSS e IR** para sócios e funcionários
- 🔸 Permite adicionar múltiplos sócios e funcionários
- 🔸 Avaliação comparativa com **MEI**
- 🔸 Interface 100% responsiva, com Material Design
- 🔸 Tela de manutenção de tabelas (alíquotas, INSS, IR)
---

## 📦 Pipeline de Deploy
GitHub Actions: ao fazer push na branch main, roda npm ci → npm run build → deploy para GitHub Pages via actions.

AWS S3 + CloudFront: artefato dist/ é enviado para bucket S3 e invalidado no CloudFront através do workflow .github/workflows/deploy.yml:
---

## 📦 **Instalação e Execução Local**

### 🔧 **Pré-requisitos**
- Node.js >= 18
- Angular CLI >= 19

### 🚀 Instruções de Build e Execução Local

```bash
# Clone este repositório
git clone https://github.com/JulianoPS/calcula-tributos-simples-nacional.git

# Acesse a pasta do projeto
cd calcula-tributos-simples-n

# Instale dependências
npm install

# Rode em modo desenvolvimento
ng serve --open

# Para build de produção
npm run build

```

## 👨💻 Autor 📬 Contato
Juliano Pereira dos Santos
- 🔗 **LinkedIn:** [linkedin.com/in/julianopereiradossantos]( https://www.linkedin.com/in/julianopereiradossantos )  
- ✉️ **Email:** julianops79@gmail.com  
- 🐙 **GitHub:** [github.com/JulianoPS]( https://github.com/JulianoPS )

### 🌐 Disponível em Produção
API (Swagger): https://jpstecdev.com.br/apisn/swagger/index.html

Front‑end Angular: https://jpstecdev.com.br/sn/
