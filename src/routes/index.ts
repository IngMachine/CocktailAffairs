import {Router} from 'express';
import {readdirSync} from 'fs';

const PATH_ROUTER: string = `${__dirname}`;
const router = Router();

/**
 * index.ts items.ts
 * @param filename
 * return index item
 */
const cleanFileName = (filename: string) => {
    return filename.split('.').shift();
}

readdirSync(PATH_ROUTER).filter( (filename) => {
    const cleanName = cleanFileName(filename);
    if ( cleanName !== 'index' ){
        import(`./${cleanName}`).then((moduleRouter) => {
            console.log(`Se esta cargando la ruta... /${cleanName}`)
            router.use(`/${cleanName}`, moduleRouter.router)
        })
    }
    console.log(filename)
} )

export { router };