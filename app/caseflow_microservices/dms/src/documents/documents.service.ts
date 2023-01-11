import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//_____________________Custom Imports_____________________//
import { CreateDocumentInput } from './dto/create-document.input';
import { caseDocumentResponse, CaseDocuments } from './documents.entity';
import { UpdateDocumentInput } from './dto/update-documet.input';
import { FetchArgs } from './dto/fetch-args.input';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(CaseDocuments)
    private documentRepository: Repository<CaseDocuments>,
  ) {}

  // summery : Get all documents
  // Created By : Don C Varghese
  async findAll(): Promise<CaseDocuments[]> {
    return this.documentRepository.find();
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
      });           
    }catch(err){
      console.log(err)
    }
  }

  // summery : Update a new document
  // Created By : Don C Varghese
  async update(id: number, updateCaseInput: UpdateDocumentInput) {
    return this.documentRepository.update({id:id},updateCaseInput)
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

   // summery : Paginated Document list by caseID
  // Created By : Gokul VG
  async forCases(args: FetchArgs,id:number):Promise<caseDocumentResponse>{
    const [CaseDocuments,totalCount] =await Promise.all([
      this.documentRepository.find(
        {
          take: args.take,
          skip: args.skip,
          where:{ "caseid":id}
        }
      ),
      this.documentRepository.count(
        {
          where:{ "caseid":id}
        }
      )
    ])    
    return {CaseDocuments,totalCount} 
    // const output =await this.documentRepository.findAndCount({
    //       take:args.take,
    //       skip:args.skip,
    //        where:{ "caseid":id}})
    // return {output,count}
  }

   
}
