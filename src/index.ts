import * as cryptoJs from "crypto-js";

export class HashDice {
    public getDestiny(entropy: string, branches: string[]): string {
        const rand = this.toRandomNumber(entropy);
        return this.choiceOne(branches, rand);
    }
    public fingerPrint(text: string): string {
        const rand = this.toRandomNumber(text);
        const fingerPrint = Math.floor(999 * rand)
            .toString()
            .padStart(3, "0");
        return `${fingerPrint}`;
    }
    private toRandomNumber(text: string): number {
        // hash を 32bit の整数に変換する
        // 4bit(16進数) * 8 = 32bit
        const hashHex = cryptoJs.SHA256(text).toString(cryptoJs.enc.Hex);
        const int32 = parseInt(hashHex.slice(0, 8), 16);
        // 0~1 の範囲に変換する
        return int32 / (Math.pow(2, 32) - 1);
    }
    private choiceOne(branches: string[], rand: number): string {
        const index = Math.floor(rand * branches.length);
        return branches[index];
    }
}

function test(): void {
    const N = 10_000;
    const branches = ["a", "b", "c", "d"];

    const dice = new HashDice();
    const result = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
    }
    for(let i=0; i<N; i++){
        const key = dice.getDestiny(String(i), [...branches]);
        result[key]++;
    }

    for(const key of branches){
        if(result[key] < N / branches.length * 0.95){
            throw `バランスが崩れてるなり: ${result}`
        }
    }
}

function main(): void {
    let query = "";
    if(typeof window !== "undefined"){
        query = window.location.search 
    }else{
        query = "?e=123&b=a%0D%0Ab%0D%0Ac"
    }
    const searchParams = new URLSearchParams(query);
    const entropy = searchParams.get("e")?.trim();
    const branches = searchParams.get("b")?.replaceAll("\r", "").trim().split("\n") || [];

    const entropyElement = document.getElementById("entropy");
    const branchesElement = document.getElementById("branches");
    (entropyElement as any).value = entropy;
    (branchesElement as any).value = branches.join("\n");

    if (!entropy || branches.length === 0 || branches[0] === "") {
        console.log("No entropy or branches");
        return;
    }

    const hashDice = new HashDice();
    const branchChecksum = hashDice.fingerPrint(branches.join(","));
    const destiny = hashDice.getDestiny(entropy, branches);

    if(typeof window !== "undefined"){
        const resultElement = document.getElementById("result");
        const branchChecksumElement = document.getElementById("checksum");
        const resultBlockElement = document.getElementById("resultBlock");

        resultElement.textContent = destiny;
        branchChecksumElement.textContent = branchChecksum;
        
        resultBlockElement.hidden = false;  
    } else {
        console.log(`return: ${destiny}`);
        console.log(`fingerPrint: ${branchChecksum}`);
    }
}
test();
main();
