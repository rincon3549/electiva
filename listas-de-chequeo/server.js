var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://localhost:27017/proyectoElectiva", function(err, response){
    if(err){console.log(err);}
    else{ console.log("connectando a"+db,+"+", response)}
});

var app = express()
app.use(bodyparser());
app.use(bodyparser.json({limt:'5mb'}));
app.use(bodyparser.urlencoded({extended:true}));

app.use(function(reg, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});
//criteriosWS
var Schema = mongo.Schema;

var criteriosShema= new Schema({
    nombre : {type: String },
    descripcion: {type : String },
    tipo: {type : String },
    peso: {type : Number },
    killer:{type : String },
    respuesta:{type : String},
    }, {versionKey:false});

var model = mongo.model('criterios', criteriosShema, 'criterios');


 app.post("/apis/SaveCriterio",function(req,res){
     var mod = new model(req.body);
     mod.save(function(err, data){
         if(err){res.send(err);
        }
        else{
            res.send({data:"Record has been Insertd..!!"});
        }
     });
 })

 app.post("/api/UpadateCriterio",function(req,res){
  console.log("paso por criterio")
     var mod = new model(req.body);
     model.findByIdAndUpdate(req.body._id, { nombre: req.body.nombre, descripcion:req.body.descripcion, tipo:req.body.tipo, peso:req.body.peso, valor:req.body.valor, killer:req.body.killer, respuesta:req.body.respuesta},
        function(err,data){
            if(err){res.send(err);
              console.log(err)
            }
            else{
                res.send({data:"Record has been Updated..!!"});
            }
        });
 })

 app.post("/api/deleteCriterio",function(req,res){
     model.remove({_id: req.body.id},function(err){
         if(err){
             res.send(err);
         }else{
             res.send({data:"Record has bee Deleted..!!"});
         }
     });
 })

 app.get("/api/getCriterio",function(req,res){
     model.find({},function(err,data){
         if(err){
             res.send(err);
         }
         else{
             res.send(data);
         }
     });
 })

//Plantilla WS
 var plantillasShema= new Schema({
    nombre : {type: String },
    descripcion: {type : String },
    criterios:[criteriosShema],
    status:{type: String },
    logCreatedBy:{type: String },
    logUpdateBy:{type: String },
    logCreatedByAt:{type: Date, default: Date.now},
    logUpdateByAt:{type: Date, default: Date.now},
    }, {versionKey:false});

var modelp = mongo.model('plantillas', plantillasShema, 'plantillas');
 app.post("/apis/SavePlantilla",function(req,res){
     var mod = new modelp(req.body);
     mod.save(function(err, data){
         if(err){res.send(err);
        }
        else{
            res.send({data:"Record has been Insertd..!!"});
        }
     });
 })

 app.post("/api/UpadatePlantillas",function(req,res){
    var mod = new modelp(req.body);
        modelp.findByIdAndUpdate(req.body._id, { nombre: req.body.nombre, descripcion:req.body.descripcion, criterios:req.body.criterios, status:req.body.status, logCreatedBy:req.body.logCreatedBy, logUpdateBy:req.body.logUpdateBy, logCreatedByAt:req.body.logCreatedByAt, logUpdateByAt:req.body.logUpdateByAt},
           function(err,data){
           if(err){res.send(err);
           }
           else{
               res.send({data:"Record has been Updated..!!"});
           }
       });
})

app.post("/api/deletePlantillas",function(req,res){
    modelp.remove({_id: req.body.id},function(err){
        if(err){
            res.send(err);
        }else{
            res.send({data:"Record has bee Deleted..!!"});
        }
    });
})

app.get("/api/getPlantillas",function(req,res){
    modelp.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})
app.post("/api/getPlantillaID",function(req,res){
  modelp.find({_id:req.body.id} ,function(err,data){
      if(err){
          res.send(err);
      }
      else{
          res.send(data);
      }
  });
})
//ListCheck
var ListCheckShema= new Schema({
  id:{type:Number, unique: true},
  nombre : {type: String },
  observacion: {type : String },
  referencia:{type: String },
  evaluacion:{type: Number },
  estado:{type: String },
  versionAt:{type: Date, default: Date.now},
  plantilla:plantillasShema,
  }, {versionKey:false});

var modelL = mongo.model('listChecks', ListCheckShema, 'listChecks');

app.post("/apis/SaveListChecks",function(req,res){
   var mod = new modelL(req.body);
   mod.save(function(err, data){
       if(err){res.send(err);
      }
      else{
          res.send({data:"Record has been Insertd..!!"});
      }
   });
})

app.post("/api/UpadateLista",function(req,res){
  var mod = new modelL(req.body);
      modelL.findByIdAndUpdate(req.body._id, {id:req.body.id, nombre: req.body.nombre, observacion:req.body.observacion, referencia:req.body.referencia, evaluacion:req.body.evaluacion, estado:req.body.estado, versionAt:req.body.versionAt, plantilla:req.body.plantilla},
         function(err,data){
         if(err){res.send(err);
         }
         else{
             res.send({data:"Record has been Updated list..!!"});
             console.log("Record has been Updated list..!!")
         }
     });
})

app.post("/api/deleteListChecks",function(req,res){
  modelL.remove({_id: req.body.id},function(err){
      if(err){
          res.send(err);
      }else{
          res.send({data:"Record has bee Deleted..!!"});
      }
  });
})

app.get("/api/getListChecks",function(req,res){
  modelL.find({},function(err,data){
      if(err){
          res.send(err);
      }
      else{
          res.send(data);
      }
  });
})

app.get("/api/getListChecksVersionado",function(req,res){
  modelL.find({ $or: [{'estado':'Insuficiente'}, {'estado':'Válido'}]},function(err,data){
      if(err){
          res.send(err);
      }
      else{
          res.send(data);
      }
  });
})
//usuario
var usuarioShema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  user_login: { type: String },
  pass: { type: String },
  rol: { type: String },
}, { versionKey: false });

var modelU = mongo.model('usuarios', usuarioShema, 'usuarios');
app.post("/apis/SaveUsuario", function (req, res) {
  var mod = new modelU(req.body);
  mod.save(function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({ data: "Record has been Insertd..!!" });
    }
  });
})

app.post("/api/UpadateUsuario", function (req, res) {
  console.log("paso por criterio")
  var mod = new modelU(req.body);
  model.findByIdAndUpdate(req.body._id,
    { nombre: req.body.nombre, apellido: req.body.apellido, user_login: req.body.user_login, pass: req.body.pass, rol: req.body.rol },
    function (err, data) {
      if (err) {
        res.send(err);
        console.log(err)
      }
      else {
        res.send({ data: "Record has been Updated..!!" });
      }
    });
})

app.post("/api/deleteUsuario", function (req, res) {
  modelU.remove({ _id: req.body.id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has bee Deleted..!!" });
    }
  });
})

app.get("/api/getUsuario", function (req, res) {
  modelU.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
})
//puerto
 app.listen(8070, function(){
     console.log('exaple app listening on port 8070')
 })
