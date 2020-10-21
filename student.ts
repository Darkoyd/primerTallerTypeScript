export class Student {
    code: number
    id: number
    age: number
    address: string
    phone: number

    constructor(code: number, id: number, age: number, address: string, phone: number) {
        this.code = code
        this.id = id
        this.age = age
        this.address = address
        this.phone = phone
    }
}