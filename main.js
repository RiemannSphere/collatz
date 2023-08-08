// 1. x_0 = 1 and v_0 = [2, 1, 1]
// 2. x_n = (a*x_0 - b)/c and v_n = [2, 0, 1] or [1, 1, 3]
function main() {
    // f, g, ff, fg, gf, gg, fff, ffg, fgf, fgg, gff, gfg, ggf, ggg, ffff, etc...
    const max_chain_len = process.argv[2]; 
    for (let chain_len = 0; chain_len < max_chain_len; chain_len++) {
        // count to 2^0, then to 2^1, then 2^2, etc.
        for (let i = 0; i < Math.pow(2, chain_len); i++ ) {
            let x = 1;
            let v = [2, 1, 1];

            // transform count to binary and use this to encode function composition chains:
            // 001 => ffg
            const binary_encoding = decimalToBinaryWithPadding(i, chain_len);
            for (let binary_digit of binary_encoding) {
                x = next_x(x, v);
            
                if (binary_digit === "0") {
                    v = f();
                } else if (binary_digit === "1") {
                    v = g();
                } else {
                    throw new Error(`Wrong binary encoding. Digit ${binary_digit} is invalid.`);
                }
            }


            // TODO: gówno jebane nie działa
            console.log(`iter = ${binary_encoding}, x = ${x}`);
        }
    }
}

function decimalToBinaryWithPadding(decimalNumber, desiredLength) {
    // Convert decimal to binary string
    let binaryString = decimalNumber.toString(2);
  
    // Calculate the number of zeroes to pad
    let paddingLength = Math.max(0, desiredLength - binaryString.length);
    
    // Add zeroes at the beginning
    binaryString = '0'.repeat(paddingLength) + binaryString;
  
    return binaryString;
}

function f() {
    return [2, 0, 1];
}

function g() {
    return [1, 1, 3];
}

function next_x(x, v) {
    return (v[0] * x - v[1]) / v[2];
}

main();