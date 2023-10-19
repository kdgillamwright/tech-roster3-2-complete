import { MongoClient, Db, Collection, FindCursor } from "mongodb";
import { Technology } from "@/tools/data.model";

// MongoDB constants
const MONGO_URL:string = "mongodb://mongo:27017/";
const MONGO_DB_NAME:string = "dbTechs";	
const MONGO_COLLECTION_TECHS:string = "technologies";

export async function getTechnologies() {
    // construct a MongoClient object
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let techArray:Technology[];
    try {
        // make connection to mongoDB server (ASYNC task)
        await mongoClient.connect();
        // get reference to database via name
        let db:Db = mongoClient.db(MONGO_DB_NAME);
        // get reference to desired collection in DB
        let collection:Collection<Technology> = db.collection<Technology>(MONGO_COLLECTION_TECHS);
        // get all documents of collection
        // let cursor:FindCursor = collection.find();
        // let cursor:FindCursor = collection.find().project({"description":false});
        // let cursor:FindCursor = collection.find({"courses":{"code":"WEBD1000","name":"Website Development"}});
        // let cursor:FindCursor = collection.find({"courses.code":"WEBD1000"});
        // let cursor:FindCursor = collections.find({"difficulty":{$lte: 2}});
        // let cursor:FindCursor = collection.find({"difficulty":{$gte:2, $lte:4}});
        let cursor:FindCursor = collection.find({"name": /^j/i});
        
        // sorting based on difficulty property
        cursor.sort("difficulty",1);
        
        // get array of documents from cursor (ASYNC task)
        techArray = await cursor.toArray();
        // need to convert ObjectId objects to strings
        techArray.forEach((tech:Technology) => tech._id = tech._id.toString());
    } catch (error:any) {
        console.log(`>>> ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return techArray;
}

// --------------------------------- challenge solution
export async function getTechnologiesForCourse(code:string) {
    // construct a MongoClient object
    let mongoClient: MongoClient = new MongoClient(MONGO_URL);

    let techArray:Technology[];
    try {
        // uppercase so API can handle course codes in any case
        code = code.toUpperCase();

        // make connection to mongoDB server (ASYNC task)
        await mongoClient.connect();
        // get reference to database via name
        let db:Db = mongoClient.db(MONGO_DB_NAME);
        // get all documents of the collection that match the query
        let cursor:FindCursor = db.collection(MONGO_COLLECTION_TECHS).find({"courses.code": code}).project({"_id": false, "description":false, "courses": false}).sort("name",1);
        // get array of documents from cursor (ASYNC task)
        techArray = await cursor.toArray();

    } catch (error:any) {
        console.log(`>>> ERROR : ${error.message}`);
        throw error;
    } finally {
        mongoClient.close();
    }

    return techArray;
}
// --------------------------------------------------------