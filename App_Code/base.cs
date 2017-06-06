using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

/// <summary>
/// @base 的摘要说明
/// </summary>
public static class Utils
{
    #region MD5 方法
    static public string md5(string str, int startIndex, int Length) { return BitConverter.ToString(new MD5CryptoServiceProvider().ComputeHash(UTF8Encoding.Default.GetBytes(str)), startIndex, Length).Replace("-", ""); }
    static public string md5(string str) { return md5(str, 0, 16); }
    static public string md5L(string str) { return md5(str, 0, 16).ToLower(); }
    static public string md5_16(string str) { return md5(str, 4, 8); }
    static public string md5_16L(string str) { return md5(str, 4, 8).ToLower(); }
    #endregion
}