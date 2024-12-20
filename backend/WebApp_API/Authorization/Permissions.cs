﻿namespace WebApp_API.Authorization
{
    public class Permissions
    {
        public static class User
        {
            public const string Controller = "User";
            public const string View = Controller + ".View";
            public const string Create = Controller + ".Create";
            public const string Update = Controller + ".Update";
            public const string Delete = Controller + ".Delete";
        }
        public static class Role
        {
            public const string Controller = "Role";
            public const string View = Controller + ".View";
            public const string Create = Controller + ".Create";
            public const string Update = Controller + ".Update";
            public const string Delete = Controller + ".Delete";
        }
        public static class Menu
        {
            public const string Controller = "Menu";
            public const string View = Controller + ".View";
            public const string Create = Controller + ".Create";
            public const string Update = Controller + ".Update";
            public const string Delete = Controller + ".Delete";
        }
        public static class Permission
        {
            public const string Controller = "Permission";
            public const string View = Controller + ".View";
            public const string Create = Controller + ".Create";
            public const string Update = Controller + ".Update";
            public const string Delete = Controller + ".Delete";
        }
        public static class Log
        {
            public const string Controller = "Log";
            public const string View = Controller + ".View";
        }
    }
}
