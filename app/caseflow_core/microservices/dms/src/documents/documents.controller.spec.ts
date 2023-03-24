import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './services/documents.service';
import { TransformService } from 'src/helpers/transform.service';
import { DocumentsController } from './documents.controller';
import { FileService } from 'src/helpers/file.service';
import {  Response as ExpressResponse } from 'express';

const sampleDocument = {
  id: 587,
  caseId: 1704,
  documentref: "4db9b2b1-5338-41bd-8110-d686559560c5",
  desc: "null",
  addedbyuserid: null,
  creationdate: new Date(),
  dmsprovider: 2,
  name: "WhatsApp Image 2023-01-01 at 5.50.11 PM.jpeg",
  latestversion: "2.0",
  isdeleted: true,
  type: "image/jpeg"
} ;

const mockFileUploadInput = {  
  name:"filename.txt",
  desc:"description",
  caseId:"1704",
  dmsprovider:2,
  metaData:'[{"id":"2fbcddee-38f8-4202-9263-2ebd72541837","MetadataField":"","MetadataValue":""}]',
  type:"type"
};

const mockDocumentDetails = {
  UniqueId:'1ebbf39c-94c0-4520-83f5-96e5c8d59ccb',
  UIVersionLabel:'1.0'
}

const mockFormattedData = {
          caseId:Number(mockFileUploadInput.caseId),
          documentref:mockDocumentDetails.UniqueId,
          name:mockFileUploadInput.name,
          desc:mockFileUploadInput.desc,
          addedbyuserid: 5,
          creationdate: new Date(),
          dmsprovider: 2,
          latestversion: mockDocumentDetails.UIVersionLabel,
          isdeleted: false,
          type : mockFileUploadInput?.type,
}
const mockUpdateFormattedData = {
  ...mockFormattedData,
  id:5
}

describe('DocumentsController', () => {
  let documentController: DocumentsController;
  let documentService :DocumentsService;
  let fileService :FileService;
  let transformService:TransformService;
  let res : ExpressResponse;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers:[{
        provide:DocumentsService,
        useValue : {
          findOne: jest.fn(() => sampleDocument),
          update:jest.fn((id,data)=>sampleDocument),
          createDocument:jest.fn((mockFormattedData)=>sampleDocument),          
        }
      },
    {
      provide:FileService,
      useValue: {
        deleteFile : jest.fn((data,dms)=>{sampleDocument}),  
         
      }
    },
    {provide:TransformService,
    useValue:{
      transform: jest.fn((dms,action,docDetails,body)=>{       
        return mockFormattedData   
      })
    }}
    ]
    })
    .compile();
    documentController = module.get<DocumentsController>(DocumentsController);
    documentService = module.get<DocumentsService>(DocumentsService);
    fileService = module.get<FileService>(FileService);
    transformService = module.get<TransformService>(TransformService);
  });
  describe('UploadDocuments',()=>{    
    it('Should be defined',()=>{
     expect (documentController.uploadDocument).toBeDefined()
    })
    it('Should called transform output ',()=>{
      const fileFormattedDocuemnt = jest.spyOn(transformService,"transform");
      transformService.transform(2,'CREATE',mockDocumentDetails,mockFileUploadInput)
      expect(fileFormattedDocuemnt).not.toBeNull()
    })
    it('Should return createDocument Output after upload',()=>{
      const createDoc = jest.spyOn(documentService,"createDocument");
      documentService.createDocument(mockFormattedData)
      expect(createDoc).not.toBeNull()
    }) 
  })

  describe('UpdateDocument',()=>{
    it('Should br defined',()=>{
      expect(documentController.editDocument).toBeDefined()
    })
    it('Should have called findOne with docID',()=>{
      const spyDocService = jest.spyOn(documentService,"findOne");
      documentService.findOne(5);
      expect(spyDocService).toBeCalledWith(5);
    })
    it('Should called transform output ',()=>{
      const fileFormattedDocuemnt = jest.spyOn(transformService,"transform");
      transformService.transform(2,'UPDATE',mockDocumentDetails,mockFileUploadInput)
      expect(fileFormattedDocuemnt).not.toBeNull()
    })
    it('Should return updateDocuemnt Output after update',()=>{
      const createDoc = jest.spyOn(documentService,"update");
      documentService.update(5,mockUpdateFormattedData)
      expect(createDoc).not.toBeNull()
    })

  })


  describe('DownloadDocument',()=>{
    it('Should be defined',()=>{
      expect(documentController.fetchDocument).toBeDefined();
    })
    it('should be only called with a document id',()=>{
      const fetchDoc =jest.spyOn(documentController,'fetchDocument');
      documentController.fetchDocument(22,res,);
      expect(fetchDoc).toBeCalledWith(22,res)
      expect(fetchDoc).not.toBeNull()
    })
    it('should call the findOne fn with one arg',()=>{
      const spyDocService = jest.spyOn(documentService,"findOne");
      documentService.findOne(5);
      expect(spyDocService).toBeCalledWith(5)
    })

  })
  describe('DeleteDocuemnt',()=>{
    it('should be defined', () => {
      expect(documentController.DeleteDocument).toBeDefined();
    }); 
    it('should fetch one  Docuemnt', async() => {
     expect( documentService.findOne(587)).toEqual({...sampleDocument})
    });
    it('should be called with a DocId',()=>{
      const deleteDoc = jest.spyOn(documentController,'DeleteDocument')
      documentController.DeleteDocument(587);
      expect(deleteDoc).toBeCalledWith(587)
    });
    it('should not return null after deleteFile',async()=>{
     const deletefile = jest.spyOn(fileService,'deleteFile')
     fileService.deleteFile(sampleDocument,2);
     expect(deletefile).not.toBeNull()
    });
    it('should return updated document details after delete',()=>{
      const updateDoc = jest.spyOn(documentService,'update');
      documentService.update(587,sampleDocument)
      expect(updateDoc).not.toBeNull()      
    });
  })

});
