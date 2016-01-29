var usuarios = [

        {
            id: 001,
            firstName: "Ray",
            lastName: "Villalobos",
            email: 'rayv@gmail.com',
            perfil:'Diseñador',
            ciudad: 'Estado de México',
            edad: 28,
            
        },
        {
            id: 002,
            firstName: "Emmanuel",
            lastName: "Morales",
            email: 'e@emmanuelhxc.com',
            perfil:'Programador',
            ciudad: 'Estado de México',
            edad: 28,
            
        },
        {
            id: 003,
            firstName: "Francisco",
            lastName: "Valencia",
            email: 'francisco.valencia.gil@gmail.com',
            perfil:'Programador',
            ciudad: 'Monterrey',
            edad: 26,
            
        },
        {
            id: 004,
            firstName: "Jose de Jesus",
            lastName: "Morales",
            email: 'juanmor@gmail.com',
            perfil:'Diseñador',
            ciudad: 'Guadalajara',
            edad: 33,
            
        },
        {
            id: 005,
            firstName: "Luis",
            lastName: "Lopez",
            email: 'lulo@gmail.com',
            perfil:'Diseñador',
            ciudad: 'Ciudad de México',
            edad: 45,
            
        },
        {
            id: 006,
            firstName: "Pablo",
            lastName: "Robellada",
            email: 'robel@hotmail.com',
            perfil:'Diseñador',
            ciudad: 'Monterrey',
            edad: 28,
            
        },
        {
            id: 007,
            firstName: "Arturo",
            lastName: "Jamaica",
            email: 'dalfaro@gmail.com',
            perfil:'Programador',
            ciudad: 'Ciudad de México',
            edad: 39,
            
        },
        {
            id: 008,
            firstName: "Mariana",
            lastName: "Segoviano",
            email: 'seaandass@gmail.com',
            perfil:'Negocios',
            ciudad: 'Monterrey',
            edad: 28,
            
        },
        {
            id: 009,
            firstName: "Cesar",
            lastName: "Salazar",
            email: 'jhdz@gmail.com',
            perfil:'Negocios',
            ciudad: 'Guadalajara',
            edad: 44,
            
        },
        {
            id: 010,
            firstName: "Paola",
            lastName: "Martinez",
            email: 'astridpao@gmail.com',
            perfil:'Diseñador',
            ciudad: 'Ciudad de México',
            edad: 22,
            
        }
        
]

var inquirer = require('inquirer');

var Nombre;

var first = true;

function accion(answers){

    

    if(first)
    {
        Nombre = answers.firstName;
    }

    var filtro = answers.profile;

    var result =[];
    usuarios.forEach(function(user){

        if(user.perfil.toLowerCase() === filtro)
        {
            result.push(user);
        }
    })

    console.log('\n'+ Nombre + '  Esta es la lista de asistentes con perfil de ' + filtro + ', se encontraron ' + result.length + ' visitantes \n');

    result.forEach(function(user){
        console.log('Nombre: '+ user.firstName +' '+ user.lastName + ' | Email: '+ user.email+ ' | Edad: '+ user.edad + ' | Ciudad: '+ user.ciudad + '\n');    
    })
    

    inquirer.prompt(    
    [
        {
            type: 'confirm',
            name: 'again',
            message: '¿Desas consultar otro perfil?',
            default: function(){
                 first = false;
            }
        }
    ]
    ,function(answer){

        if(answer.again)
{
inquirer.prompt(    
               {
        name: 'profile',
        message: '¿Qué perfil te interesa visitar?',
        type: 'list',    
        choices: ['Diseñador', 'Negocios', 'Programador'],
        filter: function (str){

          return str.toLowerCase();

        }

        }
                ,accion);
}else
{
    console.log('Adios ' + Nombre + ' :)');
}
        
    });

}

var preguntas = [
{
        type: 'input',
        name: 'firstName',
        message: '¿Hola, cómo te llamas?'
},
{
        name: 'profile',
        message: '¿Qué perfil te interesa ?',
        type: 'list',    
        choices: ['Diseñador', 'Negocios', 'Programador'],
        filter: function (str){
            
          return str.toLowerCase();

        }

}
];



inquirer.prompt(    
    preguntas
    ,accion);

