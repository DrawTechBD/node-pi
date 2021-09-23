const iconToClass = (data) => {
  switch(data.toLowerCase()) {
    // Platforms
    case 'android':
      return 'devicon-android-plain';
    case 'ios':
      return 'devicon-apple-original';
    case 'web':
      return 'fas fa-globe-americas';
    case 'desktop':
      return 'fas fa-desktop';
    case 'windows':
      return 'devicon-windows8-original';
    case 'linux':
      return 'devicon-linux-plain';
    case 'mac':
      return 'devicon-apple-original';
    case 'iot':
      return 'devicon-embeddedc-plain';

    // Languages
    case 'dart':
      return 'devicon-dart-plain';
    case 'javascript':
      return 'devicon-javascript-plain';
    case 'typeScript':
      return 'devicon-typescript-plain';
    case 'python':
      return 'devicon-python-plain-wordmark';
    case 'java':
      return 'devicon-java-plain-wordmark';
    case 'c#':
      return 'devicon-csharp-plain-wordmark';

    case 'bash':
      return 'devicon-bash-plain';
    case 'c++':
      return 'devicon-cplusplus-plain-wordmark';

    // Frameworks
    case 'flutter':
      return 'devicon-flutter-plain';
    case 'reactjs':
      return 'devicon-react-original-wordmark';
    case 'react native':
      return 'devicon-react-original';
    case 'vuejs':
      return 'devicon-vuejs-plain-wordmark';
    case 'expressjs':
      return 'devicon-express-original-wordmark';
    case 'laravel':
      return 'devicon-laravel-plain-wordmark';
    case 'flask':
      return 'devicon-flask-original-wordmark';
    case 'django':
      return 'devicon-django-plain';
    case '.net core':
      return 'devicon-dotnetcore-plain';
    case '.net desktop':
      return 'devicon-dot-net-plain-wordmark';
    case 'electronjs':
      return 'devicon-electron-original-wordmark';
    case 'swing':
      return 'devicon-java-plain-wordmark';

    // Embedded
    case 'arduino':
    case 'esp8266':
      return 'devicon-arduino-plain';
    case 'raspberry pi':
      return 'devicon-raspberrypi-line-wordmark';

    // Database
    case 'mongodb':
      return 'devicon-mongodb-plain-wordmark';
    case 'mysql':
      return 'devicon-mysql-plain-wordmark';
    case 'firebase':
      return 'devicon-firebase-plain-wordmark';
    default:
      return 'fas fa-desktop';
  }
}

export default iconToClass;