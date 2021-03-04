import { expect } from 'chai';
import * as sinon from 'sinon';
import {describe} from 'mocha'

import ReadFiles from "../../../src/services/import/readFiles";
import { Result } from "../../../src/core/logic/Result";
import ImportarDadosService from '../../../src/services/importarDadosService';

describe("importar dados create", function() {
    let stub1;
    var readFilesInstance: ReadFiles;
    beforeEach(function () {
        readFilesInstance= new ReadFiles();
        stub1 = sinon.stub(readFilesInstance as ReadFiles, 'importarDados').resolves(new Result<string>(true, null, "Dados importados: ver resultado na consola."));
    });

    it("returns string", async function() {
        const srv = new ImportarDadosService(readFilesInstance);
        let actual=await srv.importarDados("import.glx");
        expect(actual.getValue()).to.equal("Dados importados: ver resultado na consola.");
    });

    afterEach(function() {
        stub1.restore();
    });
});