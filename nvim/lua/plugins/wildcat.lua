return {
    'javiorfo/nvim-wildcat',
    lazy = true,
    cmd = { "WildcatRun", "WildcatUp", "WildcatServer" },
    ft = { "java" },
    event = { "BufReadPost pom.xml", "BufReadPost build.gradle" },
    dependencies = { 'javiorfo/nvim-popcorn', 'javiorfo/nvim-spinetta' },
    opts = {

        -- Optional. Default 15
        -- The size of the server console
        -- console_size = 15,

        -- Optional. Default "jboss"
        -- Default server (jboss or tomcat)
        default_server = "tomcat",

        -- Optional. Default "maven"
        -- Build tool (maven or gradle)
        -- build_tool = "maven",

        -- Optional. Default JAVA_HOME from the system
        -- If a different java home is required
        -- java_home = "/path/to/openjdk",

        -- Optional 
        -- Default path JBOSS_HOME from the system
        -- Default app_base "standalone/deployments"
        -- jboss = {
        --     path = "/path/to/jboss",
        --     app_base = "standalone/deployments",
        -- },

        -- Optional 
        -- Default path CATALINA_HOME from the system
        -- Default app_base "webapps"
        tomcat = {
            path = "/home/eherabr/Descargas/apache-tomcat-9.0.100",
        --     app_base = "webapps",
        }
    }
}
