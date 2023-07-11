/* Importando o PrismaClient constructor do módulo do Prisma do Node e o instanciando */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* Cria uma função assíncrona onde alocará as manipulações com o banco de dados. */
async function main() {
  //Aqui dentro dessa função assíncrona você vai colocar suas querys.
    /* SELECT * FROM categorias: */
    const allCategorias = await prisma.categoria.findMany()
    console.log(allCategorias)
}

/* Chama a função "main" criada e a fecha quando finalizada a manipulação com BD. ("process.exit"). */
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })