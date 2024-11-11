import { DatabaseSync } from 'node:sqlite'
import SqlBricks from 'sql-bricks'
// const database = new DatabaseSync(':memory:') //para salvar na memoria de um aparelho celular por exemplo
const database = new DatabaseSync('./db.sqlite')

function runSeed(items) {
    database.exec(`
        DROP TABLE IF EXISTS students
    `)
    database.exec(`
        CREATE TABLE students(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL
        ) STRICT
    `)

    insert({ table: 'students', items })
    
    // console.log(select(
    //     SqlBricks
    //         .select('name,phone')
    //         .orderBy('name')
    //         .from('students')
    //         .toString()
    // ))
}

export function select(query) {
    return database.prepare(query).all
}

export function insert({ table, items }) {
    const { text, values } = SqlBricks.insertInto(table, items)
        .toParams({ placeholder: '?' })
        
    const insertStatement = database.prepare(text)
    insertStatement.run(...values)
}

runSeed([
    {
        name: 'Kevyn',
        phone: '1234578'
    },
    {
        name: 'Sandrine',
        phone: '21568463'
    },
    {
        name: 'Erikwendel',
        phone: '599654362'
    }
])