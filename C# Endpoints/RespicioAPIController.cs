using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Collections.Generic;

using *.Models.Domain;
using *.Models.Requests;
using *.Models.Responses;

using *.Services.Interfaces;

using Newtonsoft.Json;

namespace *.Web.Controllers.Api
{
    [AllowAnonymous]
    [RoutePrefix("api/*")]
    public class *ApiController : *Controller
    {
        private *Service *Service;

        public *ApiController(*Service *Service)
        {
            *Service = *Service;
        }

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        [HttpPost]
        [Route]
        public HttpResponseMessage Create(*AddRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int id = *Service.Create(model);
                    ItemResponse<int> resp = new ItemResponse<int>();
                    resp.Item = id;
                    *.Info("TEST");
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    *.Error("was not created");
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                *.Fatal("Create log unsuccessful", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public HttpResponseMessage GetById(int id)
        {
            try
            {
                ItemResponse<*DomainModel> resp = new ItemResponse<*DomainModel>();
                resp.Item = (Service.GetById(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        [Route("{pageNumber:int}/{rowsToDisplay:int}")]
        public HttpResponseMessage Get(int pageNumber, int rowsToDisplay)
        {
            try
            {
                ItemsResponse<*DomainModel> resp = new ItemsResponse<*DomainModel>();
                resp.Items = *Service.Get(pageNumber, rowsToDisplay);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route("filter")]
        public HttpResponseMessage GetBySearch()
        {
            try
            {
                var kvp = this.Request.GetQueryNameValuePairs();
                Dictionary<string, string> queryString = new Dictionary<string, string>();
                foreach (var kv in kvp)
                {
                    queryString.Add(kv.Key.ToString(), kv.Value.ToString());
                }
                /** Here I make a query string to search dynamically upon what was put into my search bars **/
                *.Info(" - API GetBySearch accepted");
                ItemsResponse<LogsDomainModel> resp = new ItemsResponse<LogsDomainModel>();
                DateTime startdate = DateTime.ParseExact(queryString["startdate"], "yyyy-MM-dd",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime enddate = DateTime.ParseExact(queryString["enddate"], "yyyy-MM-dd",
                                       System.Globalization.CultureInfo.InvariantCulture);
                resp.Items = *Service.GetBySearch(startdate, enddate, queryString["levelType"], queryString["skey"], queryString["sortBy"], queryString["sortOrder"], int.Parse(queryString["page"]), int.Parse(queryString["rowOf*"]));
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                *.Error("* Test exception- API GetBySearch broke", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage Update(*UpdateRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    *Service.Update(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Request.CreateResponse(HttpStatusCode.OK, resp); 
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        [Route]
        public HttpResponseMessage GetAll()
        {
            try
            {
                ItemsResponse<*DomainModel> resp = new ItemsResponse<*DomainModel>();
                resp.Items = *Service.GetAll();
               *.Info("Log test - API getAll working, retrieved all list");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                *.Error(" - API getAll error.");
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        
        [HttpDelete]
        [Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                *Service.Delete(id);
                SuccessResponse resp = new SuccessResponse();
                *.Info("Log test - API delete API inside of C# fired off.");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                *.Error(" - API delete broke", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpDelete]
        [Route("deleteall")]
        public HttpResponseMessage DeleteAll()
        {
            try
            {
                *Service.DeleteAll();
                SuccessResponse resp = new SuccessResponse();
                *.Info(" - API Delete All working");
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
               *.Fatal(" - API Did not delete.", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
