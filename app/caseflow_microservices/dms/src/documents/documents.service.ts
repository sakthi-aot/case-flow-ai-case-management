import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//_____________________Custom Imports_____________________//
import { CreateDocumentInput } from './dto/create-document.input';
import { CaseDocuments } from './documents.entity';
import { UpdateDocumentInput } from './dto/update-documet.input';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(CaseDocuments)
    private documentRepository: Repository<CaseDocuments>,
  ) {}

  // summery : Get all documents
  // Created By : Don C Varghese
  async findAll(): Promise<CaseDocuments[]> {
    return this.documentRepository.find({
      where: {
        isdeleted: false,
      },
      order: {
        id: "DESC",
}
    });
  }

  // summery : Create a new document
  // Created By : Don C Varghese
  async createDocument(
    createDocumentInput: CreateDocumentInput,
  ): Promise<CaseDocuments> {
    try {
      const newCase = this.documentRepository.create(createDocumentInput);
      return this.documentRepository.save(newCase);
    } catch (err) {
      console.log(err);
    }
  }

  // summery : Select  single document
  // Created By : Don C Varghese
  async findOne( id : number ): Promise<CaseDocuments> {
    try{
      return await this.documentRepository.findOne({
        where: {
          id: id,
        
        },
        order: {
          id: "DESC",
  }
      },
       );           
    }catch(err){
      console.log(err)
    }
  }

  // summery : Update a new document
  // Created By : Don C Varghese
  async update(id: number, updateCaseInput: UpdateDocumentInput) {
    return this.documentRepository.update(id,updateCaseInput)
    .then( ()=> this.findOne(id))
    .catch( (e) => {
      console.error(e.message)
    })
  }

  // summery : Delete a new document
  // Created By : Don C Varghese
  async remove(id: number) {
    let caseData = this.documentRepository.findOne({
      where: {
        id: id,
      },
    });
    if (caseData) {
      let ret = await this.documentRepository.delete(id);
      if (ret.affected === 1) {
        return caseData;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }

  async forCases(id:number){
    return this.documentRepository.find({ where:{ "caseId":id,isdeleted: false}, order: {
      id: "DESC",
}})
  }

  searchCaseDocument(searchField,searchColumn){
    try{
    if(searchColumn){
      switch(searchColumn){
        case 'Description': {
          return this.documentRepository.createQueryBuilder("table")
          .where("LOWER(table.desc) LIKE :title", { title: `%${ searchField.toLowerCase() }%` })
          .getMany();
        }
        default :
        return this.documentRepository.createQueryBuilder("table")
        .where("LOWER(table.name) LIKE :title", { title: `%${ searchField.toLowerCase() }%` })
        .getMany();
      }
    }
    else{
      return  new HttpException("select a field", HttpStatus.BAD_REQUEST)
    }

    }
    catch{
      throw new HttpException("something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
