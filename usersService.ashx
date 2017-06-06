<%@ WebHandler Language="C#" Class="usersService" %>
using System;
using System.Web;
using System.Web.Script.Serialization;

public class usersService : IHttpHandler
{
    private class result
    {
        public int code { get; set; }
        public string message { get; set; }
        public string items { get; set; }
    }

    public void ProcessRequest(HttpContext context)
    {
        HttpContext me = HttpContext.Current;
        result r = new result();
        if (string.IsNullOrEmpty(me.Request.Form["token"]))
        {
            r.code = -9;
            r.message = "数据无效";
            r.items = "{}";
            me.Response.Write(new JavaScriptSerializer().Serialize(r));
            me.Response.End();
        }

        string token = me.Request.Form["token"].ToString();
        string t = me.Request.Form["t"].ToString();
        string sign = me.Request.Form["sign"].ToString();
        string signStr = Utils.md5_16L("token=" + token + "&t=" + t);

        DateTime dtResult = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1)).Add(new TimeSpan(long.Parse(t + (t.Length == 13 ? "0000" : "0000000"))));

        //验证超时60秒
        if (new TimeSpan(DateTime.Now.Ticks - dtResult.Ticks).TotalSeconds < 60)
        {
            if (sign == signStr)
            {
                //TODO: 数据库链接查询
                r.code = 0;
                r.message = "验证成功";
                //TODO:用户基本信息
                r.items = "{}";
                me.Response.Write(new JavaScriptSerializer().Serialize(r));
            }
            else
            {
                r.code = -1;
                r.message = "签名验证失败";
                r.items = signStr + " # " + sign;
                me.Response.Write(new JavaScriptSerializer().Serialize(r));
            }
        }
        else
        {
            r.code = -1;
            r.message = "连接超时";
            r.items = "{}";
            me.Response.Write(new JavaScriptSerializer().Serialize(r));
        }
        me.Response.End();
    }



    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}