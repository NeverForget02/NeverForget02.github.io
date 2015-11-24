Base Grunt Project
=====
Descargar node para windows

<pre>https://nodejs.org/en/</pre>

Configuracion de node.js en la terminal railinstaller

<pre>node --version</pre>
<pre>npm cache clean</pre>
<pre>npm update -g</pre>

Corran este comando en el directorio del proyecto para que se instalen todos los plugins.

<pre> npm install </pre>

<pre>npm install -g grunt-cli</pre>

### Dependencias:

*    "browser-sync": "^2.9.3",
*    "grunt": "^0.4.5",
*    "grunt-browser-sync": "^2.1.3",
*    "grunt-contrib-imagemin": "^0.9.4",
*    "grunt-contrib-uglify": "^0.9.2",
*    "grunt-contrib-watch": "^0.6.1",
*    "grunt-newer": "^1.1.1",
*    "grunt-sass": "^1.0.0"

Después de instalar las dependencias solo corren este comando y listo:

<pre> grunt dev </pre>
