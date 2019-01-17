using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

using *.Data;
using *.Data.Providers;

using *.Models.Domain;
using *.Models.Requests;

using *.Services.Interfaces;


namespace *.Services.*Service
{
    public class *Service : *Service
    {
        private IDataProvider _dataProvider;

        public *Service(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Create(*AddRequest model)
        {
            int id = 0;

            this._dataProvider.ExecuteNonQuery(
                "RobertPaulRespicio_Insert",

                inputParamMapper: delegate (SqlParameterCollection paramList)
                {
                    SqlParameter parm = new SqlParameter
                    {
                        ParameterName = "@Id",
                        SqlDbType = SqlDbType.Int,
                        Direction = ParameterDirection.Output
                    };
                    paramList.Add(parm);
                },
                returnParameters: delegate (SqlParameterCollection paramList)
                {
                    id = (int)paramList["@Id"].Value;
                });
            return id;
        }

        public List<*DomainModel> Get(int pageNumber, int rowsToDisplay)
        {
            List<*DomainModel> result = new List<&DomainModel>();
            this._dataProvider.ExecuteCmd(
                "RobertPaulRespicio_Select",
                inputParamMapper: delegate (SqlParameterCollection parmList)
                {
                    SqlParameter parm = new SqlParameter
                    {
                        ParameterName = "@Id",
                        SqlDbType = SqlDbType.Int,
                        Direction = ParameterDirection.Output
                    };

                    parmList.AddWithValue("@pageNumber", pageNumber);
                    parmList.AddWithValue("@rowsToDisplay", rowsToDisplay);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    *DomainModel model = new *DomainModel();
                    int index = 0;
                    model = MapData(reader, index);
                    index++;
                    result.Add(model);
                });
            return result;
        }

        public List<*DomainModel> GetBySearch(DateTime dateStart, DateTime dateEnd, string levelType, string search, string sortBy, string sortOrder, int pageNumber, int rowsToDisplay)
        {
            List<*DomainModel> result = new List<*DomainModel>();
            this._dataProvider.ExecuteCmd(
            "RobertPaulRespicio_Search",
             inputParamMapper: delegate (SqlParameterCollection parmList)
             {
                 SqlParameter parm = new SqlParameter
                 {
                     ParameterName = "@Id",
                     SqlDbType = SqlDbType.Int,
                     Direction = ParameterDirection.Output
                 };

                 parmList.AddWithValue("@dateStart", dateStart);
                 parmList.AddWithValue("@dateEnd", dateEnd);
                 parmList.AddWithValue("@levelType", levelType);
                 parmList.AddWithValue("@search", search);
                 parmList.AddWithValue("@sortBy", sortBy);
                 parmList.AddWithValue("@sortOrder", sortOrder);
                 parmList.AddWithValue("@pageNumber", pageNumber);
                 parmList.AddWithValue("@rowsToDisplay", rowsToDisplay);
             },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    *DomainModel model = new *DomainModel();
                    int index = 0;
                    model = MapData(reader, index);
                    index++;
                    result.Add(model);
                });
            return result;
        }

        public List<*DomainModel> GetAll()
        {
            List<*DomainModel> result = new List<*DomainModel>();
            this._dataProvider.ExecuteCmd(
                "RobertPaulRespicio_SelectAll",
                inputParamMapper: null,

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    *DomainModel model = new *DomainModel();
                    int index = 0;
                    model = MapData(reader, index);
                    index++;
                    result.Add(model);
                });
            return result;
        }
        
        public *DomainModel GetById(int id)
        {
            *DomainModel model = new *DomainModel();
            this._dataProvider.ExecuteCmd(
                "RobertPaulRespicio_SelectById",
                inputParamMapper: delegate (SqlParameterCollection parmList)
                {
                    parmList.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;

                    model = MapData(reader, index);
                });
            return model;
        }       

/** this makes the domain model readable, so we don't have insert this everywhere, instead you can create an instance of it **/

        public static *DomainModel MapData(IDataReader reader, int index)
        {
            *DomainModel model = new *DomainModel();
                model.Id = reader.GetSafeInt32(index++);
                model.Date = reader.GetSafeDateTime(index++);
                model.Thread = reader.GetSafeString(index++);
                model.Level = reader.GetSafeString(index++);
                model.Logger = reader.GetSafeString(index++);
                model.Message = reader.GetSafeString(index++);
                model.Exception = reader.GetSafeString(index++);
                return model;
        }

        public void Update(*UpdateRequest model)
        {
            this._dataProvider.ExecuteNonQuery(
            "RobertPaulRespicio_Update",
            inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                    paramCol.AddWithValue("@Date", model.Date);
                    paramCol.AddWithValue("@Thread", model.Thread);
                    paramCol.AddWithValue("@Level", model.Level);
                    paramCol.AddWithValue("@Logger", model.Logger);
                    paramCol.AddWithValue("@Message", model.Message);
                    paramCol.AddWithValue("@Exception", model.Exception);               
                }
            );
        }

        public void Delete(int id)
        {
            this._dataProvider.ExecuteNonQuery(
                "RobertPaulRespicio_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                });
        } 

        public void DeleteAll()
        {
            this._dataProvider.ExecuteNonQuery(
                "RobertPaulRespicio_DeleteAll",
                inputParamMapper: null
                );
        }
