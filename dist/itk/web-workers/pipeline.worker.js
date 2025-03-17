import registerWebworker from 'webworker-promise/lib/register.js';
import loadPipelineModule from './loadPipelineModule.js';
import loadImageIOPipelineModule from './loadImageIOPipelineModule.js';
import loadMeshIOPipelineModule from './loadMeshIOPipelineModule.js';
import runPipeline from './runPipeline.js';
registerWebworker(async function (input) {
    let pipelineModule = null;
    if (input.operation === 'runPipeline') {
        const pipelineBaseUrl = typeof input.config[input.pipelineBaseUrl] === 'undefined' ? input.pipelineBaseUrl : input.config[input.pipelineBaseUrl];
        pipelineModule = await loadPipelineModule(input.pipelinePath, pipelineBaseUrl);
    }
    else if (input.operation === 'readImage') {
        pipelineModule = await loadImageIOPipelineModule(input, '-read-image');
    }
    else if (input.operation === 'writeImage') {
        pipelineModule = await loadImageIOPipelineModule(input, '-write-image');
    }
    else if (input.operation === 'readMesh') {
        pipelineModule = await loadMeshIOPipelineModule(input, '-read-mesh');
    }
    else if (input.operation === 'writeMesh') {
        pipelineModule = await loadMeshIOPipelineModule(input, '-write-mesh');
    }
    else if (input.operation === 'meshToPolyData') {
        pipelineModule = await loadPipelineModule('mesh-to-polydata', input.config.meshIOUrl);
    }
    else if (input.operation === 'polyDataToMesh') {
        pipelineModule = await loadPipelineModule('polydata-to-mesh', input.config.meshIOUrl);
    }
    else if (input.operation === 'readDICOMImageSeries') {
        pipelineModule = await loadPipelineModule('read-image-dicom-file-series', input.config.imageIOUrl);
    }
    else if (input.operation === 'readDICOMTags') {
        pipelineModule = await loadPipelineModule('read-dicom-tags', input.config.imageIOUrl);
    }
    else {
        throw new Error('Unknown worker operation');
    }
    return runPipeline(pipelineModule, input.args, input.outputs, input.inputs);
});
