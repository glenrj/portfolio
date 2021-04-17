
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
            options: {
                sourcemap: false,
                compress: false,
                yuicompress: false,
                style: 'expanded'
            },
            files: {
                'src/styles/style.css' : 'src/styles/style.scss'
            }
            },
        },
        watch: {
            css: {
            files: '**/*.scss',
            tasks: ['sass'] 
            }
        },
        copy: {
            html: {
                flatten: true,
                expand: true,
                src: './src/index.html',
                dest: './build/'
            },
            css: {
                flatten: true,
                expand: true,
                src: './src/styles/style.css',
                dest: './build/styles'
            },
            images: {
                flatten: true,
                expand: true,
                src: './src/assets/*',
                dest: './build/assets/'
            },
            scripts: {
                flatten: true,
                expand: true,
                src: './src/scripts/*',
                dest: './build/scripts/'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['sass', 'copy:html', 'copy:css', 'copy:images', 'copy:scripts']);
}