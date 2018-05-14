/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.PC = 0; // Program Counter
  }
  binaryToDecimal(bin) {
    return parseInt(bin, 10);
  }
  decimalToBinary(dec) {
    let output = "";
    let length = 8;
    while (length--) {
      output += (dec >> length) & 1;
    }
    return output;
  }
  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  hlt() {
    this.stopClock();
    return;
  }
  ldi(register, integer) {
    this.reg[this.binaryToDecimal(register)] = integer;
  }
  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  prn(register) {
    console.log(this.binaryToDecimal(this.reg[this.binaryToDecimal(register)]));
  }
  alu(op, regA, regB) {
    switch (op) {
      case "MUL":
        // !!! IMPLEMENT ME
        this.reg[regA] = this.reg[regA] * this.reg[regB];
        break;
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)
    let IR = this.ram.read(this.PC);
    // !!! IMPLEMENT ME

    // Debugging output
    console.log(`${this.PC}: ${IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    // !!! IMPLEMENT ME
    let next1 = this.ram.read(this.PC + 1);
    let next2 = this.ram.read(this.PC + 2);

    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.

    switch (this.decimalToBinary(IR)) {
      case "10011001":
        this.ldi(next1, next2);
        break;
      case "01000011":
        this.prn(next1);
        break;
      case "00000001":
        this.hlt();
        break;
      case "10101010":
        this.alu("MUL", next1, next2);
        break;
      default:
        this.hlt();
    }

    // !!! IMPLEMENT ME

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    this.PC += (IR >> 6) + 1;

    // !!! IMPLEMENT ME
  }
}

module.exports = CPU;
