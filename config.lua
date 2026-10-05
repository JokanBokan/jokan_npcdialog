Config = {}

Config.npcs = {
    {
        name = "John Doe",
        text = "Hello there, how can i be of service?",
        job_limited = {name = "", grade = 2}, -- can be nil, if you want everyone to access it
        target_text = "Talk", -- target label
        target_icon = "", -- font awesome icon
        ped = "a_f_m_beach_01", -- any ped model
        coords = vector4(0,0,0,0),
        options = {
            {
                label = "Test Client Event",
                event = "jokan_npcdialog:example_client_event",
                type = "client",
                args = {}
            },
            {
                label = "Test Server Event",
                event = 'jokan_npcdialog:example_server_event',
                type = "server",
                args = {}
            },
            {
                label = "Test Command",
                event = "jokan_npcdialog_example_command",
                type = "command",
                args = {}
            }
        }
    },
}