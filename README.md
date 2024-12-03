🎵🎵 SongStories API 🎵🎵
SongStories es una API para compartir y descubrir historias curiosas relacionadas con canciones. Cualquier usuario puede explorar las canciones y sus historias, pero para contribuir debes registrarte e iniciar sesión.
Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre ambos tipos de registros y relacionarlos de manera eficiente. La API está diseñada para ser flexible y escalable, ofreciendo herramientas para explorar canciones y sus historias con facilidad.
 
### Características principales ### 

### Canciones y Artistas
•	Cada canción se identifica por su combinación única de nombre y artista.
•	Solo los administradores pueden aprobar canciones antes de hacerlas públicas.
Historias
•	Están vinculadas tanto a la canción como al usuario creador.
Gestión de Usuarios y Roles
•	Usuarios (user) y Administradores (admin).
•	Los administradores tienen control total sobre el contenido y los permisos.
 
### Iniciación del proyecto con seeds
Para inicializar la base de datos con contenido inicial, se utilizaron archivos seed diseñados para canciones, historias y usuarios.
Archivos seed
•	songsData.js: Contiene datos iniciales sobre canciones.
Scripts de carga
•	songsSeed.js: Permiten poblar la base de datos con los datos iniciales de forma sencilla.
•	Los scripts están organizados dentro de la carpeta utils.
Esto garantiza un entorno preconfigurado para el desarrollo y pruebas, facilitando la validación de las funcionalidades de la API.
 
### Características de los Schemas ### 

### songSchema
El esquema de canciones cuenta con las siguientes configuraciones clave:
•	name:
o	Es obligatorio (required: true) y único (unique: true), lo que garantiza que no se repitan títulos de canciones en la base de datos.
•	artist:
o	Almacena el nombre del grupo o artista que interpreta la canción.
o	Es obligatorio y permite realizar búsquedas rápidas por artista.
•	details:
o	Contiene información adicional o curiosidades sobre la canción (opcional).

### storySchema
El esquema de historias añade las siguientes funcionalidades:
•	title:
o	Define el título de la historia. Es obligatorio y único para evitar duplicidades.
•	content:
o	Almacena el contenido narrativo de la historia, explicando anécdotas o significados detrás de la canción.
•	song:
o	Es una referencia (ObjectId) al modelo Song.
o	Permite asociar cada historia con una canción específica.

### userSchema
El esquema de usuarios está diseñado para gestionar información básica y roles dentro de la API:
•	username:
o	Obligatorio y único, asegurando que cada usuario tenga un identificador único.
•	email:
o	Obligatorio y único, lo que permite identificar a los usuarios por su correo electrónico de forma segura.
•	password:
o	Obligatorio y almacena la contraseña del usuario de manera encriptada.
•	role:
o	Define el rol del usuario (admin o user).
o	Por defecto, se asigna el rol user.
 
### Funcionalidades principales### 

### Songs
•	Cualquier usuario puede explorar las canciones verificadas y sus historias asociadas.
•	Los usuarios registrados pueden sugerir nuevas canciones y añadir historias.
•	Las canciones deben ser verificadas por un administrador antes de ser públicas.
•	Cada canción es única en combinación de nombre y artista.

### Stories
•	Los usuarios pueden añadir historias a las canciones existentes.
•	Las historias están vinculadas a la canción y al usuario que las creó.

### Roles
•	Los usuarios tienen el rol por defecto de user.
•	Solo los administradores (admin) pueden:
o	Aprobar canciones.
o	Cambiar el rol de otros usuarios.
o	Eliminar cualquier canción, usuario o historia.
 
### Requisitos ### 
•	Node.js v16+
•	MongoDB
 
### Instalación ### 
1.	Clona este repositorio:
bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
2.	Instala las dependencias:
bash
Copiar código
npm install
3.	Configura las variables de entorno: Crea un archivo .env con los siguientes valores:
env
Copiar código
PORT=3000
MONGO_URI=<TU_CONEXIÓN_A_MONGO_DB>
JWT_SECRET=<TU_SECRETO_JWT>
4.	Inicia el servidor:
bash
Copiar código
npm start
 
### Endpoints ### 

### Users
Método	  Endpoint	                Descripción	                                Autenticación
POST	   /users/register	          Registro de usuario.	                       No
POST	   /users/login	              Inicio de sesión.                            No
GET	     /users/	                  Lista todos los usuarios.	                   Admin
PUT  	   /users/change-user/:id	    Cambia el rol de un usuario.                 Admin
DELETE 	 /users/:id	                Elimina un usuario.	                         Auth + Propio/Admin

### Songs

Método	  Endpoint	              Descripción	                                  Autenticación
GET	    /songs/	                  Lista todas las canciones verificadas.            	No
GET	    /songs/not-verified	      Lista canciones pendientes de verificación.	        Admin
GET	    /songs/:id	              Muestra detalles de una canción por ID.	            No
GET	    /songs/cancion/:name	    Busca canciones por nombre.                        	No
GET	    /songs/artista/:artist	  Busca canciones por artista.                      	No
POST	  /songs/	                  Crea una nueva canción.	                            Auth
PUT	    /songs/:id	              Edita una canción.	                                Auth + Propio/Admin
DELETE	/songs/:id	              Elimina una canción.	                              Auth + Propio/Admin

### Stories	


Método	    Endpoint        	      Descripción	                                      Autenticación
POST	  /stories/	                  Crea una nueva historia.	                        Auth
PUT	    /stories/:id              	Edita una historia.	                              Auth + Propio/Admin
DELETE	/stories/:id	              Elimina una historia.	                            Auth + Propio/Admin
GET	    /stories/usuarios/:user    	Muestra historias creadas por un usuario.	        No

 
### Roles y Permisos ###

### Usuario (user)
•	Crear canciones y añadir historias.
•	Editar o eliminar solo sus canciones/historias.
Administrador (admin)
•	Verificar y aprobar canciones.
•	Eliminar cualquier contenido.
•	Modificar roles de usuarios.

 
### Tecnologías utilizadas ###
•	Node.js
•	Express.js
•	MongoDB
•	Mongoose
•	JWT para autenticación

