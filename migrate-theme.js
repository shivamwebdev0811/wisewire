const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
  // Backgrounds
  'bg-richblack-900': 'bg-white',
  'bg-richblack-800': 'bg-gray-50',
  'bg-richblack-700': 'bg-gray-100',
  'bg-richblack-600': 'bg-gray-200',
  'bg-richblack-500': 'bg-gray-300',
  'bg-richblack-400': 'bg-gray-400',
  'bg-richblack-300': 'bg-gray-500',
  'bg-richblack-200': 'bg-gray-600',
  'bg-richblack-100': 'bg-gray-700',
  'bg-richblack-50': 'bg-gray-800',
  'bg-richblack-25': 'bg-gray-900',
  'bg-richblack-5': 'bg-gray-950',
  'bg-[#303030]': 'bg-white',
  
  // Text
  'text-white': 'text-gray-900',
  'text-richblack-5': 'text-gray-900',
  'text-richblack-25': 'text-gray-800',
  'text-richblack-50': 'text-gray-700',
  'text-richblack-100': 'text-gray-600',
  'text-richblack-200': 'text-gray-500',
  'text-richblack-300': 'text-gray-500',
  'text-richblack-400': 'text-gray-500',
  'text-richblack-500': 'text-gray-500',
  'text-richblack-600': 'text-gray-400',
  'text-richblack-700': 'text-gray-300',
  'text-richblack-800': 'text-gray-200',
  'text-richblack-900': 'text-gray-100',

  // Borders
  'border-richblack-800': 'border-gray-200',
  'border-richblack-700': 'border-gray-300',
  'border-richblack-600': 'border-gray-400',
  'border-richblack-500': 'border-gray-400',
  'border-richblack-400': 'border-gray-400',
  'border-richblack-300': 'border-gray-500',
  'border-richblack-200': 'border-gray-500',
  'border-richblack-100': 'border-gray-600',
  'border-richblack-50': 'border-gray-700',
  'border-richblack-25': 'border-gray-800',
  'border-richblack-5': 'border-gray-900',

  // Primary Buttons / Accents (Yellow to Blue)
  'bg-yellow-50': 'bg-blue-600',
  'text-yellow-50': 'text-blue-600',
  'border-yellow-50': 'border-blue-600',
  
  'bg-yellow-100': 'bg-blue-500',
  'text-yellow-100': 'text-blue-500',

  // Misc fixes
  'text-pure-greys-25': 'text-gray-700',
  'text-pure-greys-50': 'text-gray-600',
  'text-pure-greys-100': 'text-gray-500',
  'text-pure-greys-200': 'text-gray-500',
  'text-pure-greys-300': 'text-gray-400',
  'text-pure-greys-400': 'text-gray-400',
  'text-pure-greys-500': 'text-gray-300',
  'text-pure-greys-600': 'text-gray-300',
  'bg-pure-greys-5': 'bg-white',
  'bg-pure-greys-25': 'bg-gray-50',
  'bg-pure-greys-50': 'bg-gray-100',
  'bg-pure-greys-100': 'bg-gray-200',

  'bg-pink-150': 'bg-blue-600',
  'text-pink-150': 'text-blue-600',
  'text-pink-200': 'text-pink-600',
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;

      for (const [oldClass, newClass] of Object.entries(replacements)) {
        const searchStr = oldClass.replace(/\\/g, ''); 
        newContent = newContent.split(searchStr).join(newClass);
      }

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Migration complete!');
