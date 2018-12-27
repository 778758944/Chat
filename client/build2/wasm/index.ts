export function loadWasm(path: string): Promise<ArrayBuffer> {
    return fetch(path).then((res: Response) => {
        return res.arrayBuffer();
    }).catch((err) => {
        return Promise.reject(err)
    });
}



// async means it will return a promise
export default async function initWasm(name: string, init: Function, cb: Function) {
    try {
        const wasmPath = `/wasm/${name}.wasm`;
        const wasmBinary = await loadWasm(wasmPath);
        const p = new Promise((resolve, reject) => {
            let wasmObject: any;
            const config = {
                wasmBinary,
                onRuntimeInitialized() {
                    cb(wasmObject);
                    resolve(true);
                }
            }
            try {
                wasmObject = init(config);
            } catch(err) {
                reject(err);
            }
        });
        return p;
    } catch(err) {
        return null;
    }
}

/*
export class JpegEncode {
    private static inst: JpegEncode;
    private wasmObject: any = {};
    private constructor() {
        this.setWasmObject = this.setWasmObject.bind(this);
    }

    private setWasmObject(wasmObject: any) {
        this.wasmObject = wasmObject;
    }

    private async initJpegEncode() {
        try {
            const init = await import("../../wasm/jpeg_encode");
            if (typeof init === "function") {
                const t = await initWasm("jpeg_encode", init, this.setWasmObject);
                console.log(this.wasmObject);
                if (!t) return false;
                return true;
            }
            return false;
        } catch(err) {
            return false;
        }
    }

    public static async getInstance() {
        if (!this.inst) {
            this.inst = new JpegEncode();
            const t = await this.inst.initJpegEncode();
            if (!t) return null;
        }
        return this.inst;
    }
}
*/