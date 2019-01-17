using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

using *.Data;
using Eleveight.Data.Providers;

using *.Models.Domain;
using *.Models.Requests;
      *
using *.Services.Interfaces;
using System;

namespace *.Services.LogsService
{
    public class *Service :*Service
    {
        private IDataProvider _dataProvider;

        public *Service(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Create(LogsAddRequest model)
        {
            int id = 0;

            this._dataProvider.ExecuteNonQuery(
                "Logs_Insert",

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

        public List<LogsDomainModel> Get(int pageNumber, int rowsToDisplay)
        {
            List<LogsDomainModel> result = new List<LogsDomainModel>();
            this._dataProvider.ExecuteCmd(
                "Logs_Select",
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
                    LogsDomainModel model = new LogsDomainModel();
                    int index = 0;
                    model = MapData(reader, index);
                    index++;
                    result.Add(model);
                });
            return result;
        }

        public List<LogsDomainModel> GetBySearch(DateTime dateStart, DateTime dateEnd, string levelType, string search, string sortBy, string sortOrder, int pageNumber, int rowsToDisplay)
        {
            List<LogsDomainModel> result = new List<LogsDomainModel>();
            this._dataProvider.ExecuteCmd(
            "Logs_Search",
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
                    LogsDomainModel model = new LogsDomainModel();
                    int index = 0;
                    model = MapData(reader, index);
                    index++;
                    result.Add(model);
                });
            return result;
        }

        public List<LogsDomainModel> GetAll()
        {
            List<LogsDomainModel> result = new List<LogsDomainModel>();
            this._dataProvider.ExecuteCmd(
                "Logs_SelectAll",
                inputParamMapper: null,

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    LogsDomainModel model = new LogsDomainModel();
                    int index = 0;
                    model = MapData(reader, index);
                    index++;
                    result.Add(model);
                });
            return result;
        }
        
        public LogsDomainModel GetById(int id)
        {
            LogsDomainModel model = new LogsDomainModel();
            this._dataProvider.ExecuteCmd(
                "Logs_SelectById",
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

        public static LogsDomainModel MapData(IDataReader reader, int index)
        {
            LogsDomainModel model = new LogsDomainModel();
                model.Id = reader.GetSafeInt32(index++);
                model.Date = reader.GetSafeDateTime(index++);
                model.Thread = reader.GetSafeString(index++);
                model.Level = reader.GetSafeString(index++);
                model.Logger = reader.GetSafeString(index++);
                model.Message = reader.GetSafeString(index++);
                model.Exception = reader.GetSafeString(index++);
                return model;
        }

        public void Update(LogsUpdateRequest model)
        {
            this._dataProvider.ExecuteNonQuery(
            "Logs_Update",
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
                "Logs_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                });
        } 

        public void DeleteAll()
        {
            this._dataProvider.ExecuteNonQuery(
                "Logs_DeleteAll",
                inputParamMapper: null
                );
        }

        public int GetTotalLogsCount()
        {
            int result = 0;
            this._dataProvider.ExecuteCmd(
                "Aggregated_Logs",
                inputParamMapper: null,

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    result = reader.GetSafeInt32(0);
                });
            return result;
        }
    }
}

