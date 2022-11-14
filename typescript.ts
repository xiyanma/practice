/* ts */
interface Person {
    id: number;
    name: string;
    s: string
}

// function func(s: string) {  //改成：
function func(s: keyof Person) {
    const obj = {} as Person;
    obj.name = s
    return obj.name;
}