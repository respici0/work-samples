using System;
using System.Linq;
using System.Collections.Generic;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using Moq;

using *.Models.Domain;
using *.Models.Requests;

using *.Services.Interfaces;

namespace *.Tests.Services
{
    [TestClass]
    public class LogsServiceTest
    {
        private readonly *Service *Service;

        public *ServiceTest()
        {
            DateTime makeNow = DateTime.Now;

            List<*DomainModel> domainList = new List<*DomainModel>();
            for (int i = 1; i < 21; i++)
            {
                domainList.Add(new *DomainModel
                {
                    Id = i,
                    Date = DateTime.Now.AddDays(-i),
                    Thread = string.Format("The #{0} thread", i),
                    Level = string.Format("The #{0} Level", i),
                    Logger = string.Format("The #{0} Logger", i),
                    Message = string.Format("The #{0} Message", i),
                    Exception = string.Format("The #{0}", i)
                });
            }

            var mock = new Mock<*Service>();
            mock.Setup(m => m.Create(It.IsAny<*AddRequest>())).Returns(
                (*AddRequest model) =>
                {
                    int id = domainList.Count + 1;

                    domainList.Add(new *DomainModel
                    {
                        Id = id,
                        Date = model.Date,
                        Thread = model.Thread,
                        Level = model.Level,
                        Logger = model.Logger,
                        Message = model.Message,
                        Exception = model.Exception
                    });
                    return id;
                });

            mock.Setup(m => m.GetById(It.IsAny<int>())).Returns(
                (int id) =>
                {
                   *DomainModel model = domainList.FirstOrDefault(r => r.Id == id);

                    return model;
                });

            mock.Setup(m => m.Get(It.IsAny<int>(), It.IsAny<int>())).Returns(domainList);


            mock.Setup(m => m.Update(It.IsAny<LogsUpdateRequest>())).Callback(
                (LogsUpdateRequest modifiedModel) =>
                {
                    DateTime updatedNow = DateTime.Now;

                    *DomainModel model = domainList.Where(m => m.Id == modifiedModel.Id).Single();

                    model.Id = modifiedModel.Id;
                    model.Date = modifiedModel.Date;
                    model.Thread = modifiedModel.Thread;
                    model.Level = model.Level;
                    model.Logger = model.Logger;
                    model.Message = model.Message;
                    model.Exception = model.Exception;
                });

            mock.Setup(m => m.GetAll()).Returns(domainList);

            mock.Setup(m => m.Delete(It.IsAny<int>())).Callback((int i) =>
            {
                *DomainModel model = domainList.Where(m => m.Id == i).Single();

                domainList.Remove(model);
            });

            //mock.Setup(m => m.DeleteAll()).Remove(domainList);

            this.*Service = mock.Object;
        }

        [TestMethod]
        public void*Test()
        {
            *AddRequest model = new *AddRequest
            {
                Date = DateTime.Now.AddYears(-28),
                Thread = "ThreadTest",
                Level = "LevelTest",
                Logger = "LoggerTest",
                Message = "MessageTest",
                Exception = "ExceptionTest"
            };

            int id = *Service.Create(model);

            Assert.IsTrue(id > 0, "Insert Failed");
        }

        [TestMethod]
        public void SelectById()
        {
            *DomainModel model =*Service.GetById(1);

            Assert.IsTrue(model != null);
            Assert.IsTrue(model.Id == 1);
        }

        [TestMethod]
        public void Select()
        {
            List<*DomainModel> resultList = *Service.Get(1, 20);

            Assert.IsTrue(resultList.Count == 20);
        }

        [TestMethod]
        public void SelectAll()
        {
            List<*DomainModel> list = *Service.GetAll();

            Assert.IsNotNull(list, "Please check to see if you have records in the table");
            Assert.IsTrue(list.Count > 0, "Count is 0 - please check for records in the table");
        }

        [TestMethod]
        public void Update()
        {
            *DomainModel orig1Model = *Service.GetById(1);

            *UpdateRequest modifiedModel = new*UpdateRequest();
            {
                modifiedModel.Id = orig1Model.Id;
                modifiedModel.Date = DateTime.Now.AddYears(-28);
                modifiedModel.Thread = "Thread";
                modifiedModel.Level = "Level";
                modifiedModel.Logger = "Logger";
                modifiedModel.Message = "Message";
                modifiedModel.Exception = "Exception";
            };

            *Service.Update(modifiedModel);

            *DomainModel orig2Model = *Service.GetById(1);

            Assert.IsTrue(orig1Model.Id == orig2Model.Id, "Id's don't match");
        }

        [TestMethod]
        public void Delete()
        {
            *DomainModel orig1Model =*Service.GetById(3);

            *Service.Delete(orig1Model.Id);

            *DomainModel deletedModel = *Service.GetById(3);

            Assert.IsNull(deletedModel);
        }
    }
}
