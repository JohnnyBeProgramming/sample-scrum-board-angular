
class Guid {

    public static Empty: string = '00000000-0000-0000-0000-000000000000';

    public static New(): string {
        return Guid.generate();
    }

    private static generate() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    private static s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}
