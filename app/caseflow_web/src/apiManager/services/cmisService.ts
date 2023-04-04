import {
  httpGETBolbRequest,
  httpPOSTRequest,
  httpPUTRequest,
} from "../httpRequestHandler";
import { API } from "../endpoints/index";

export const fetchCMISfile = (documentId, DMS, newTab = true) => {
  return (dispatch) => {
    const downloadURL = API.DMS_API + "/dms" + DMS + "/download";

    console.warn(downloadURL);
    httpGETBolbRequest(downloadURL, { id: documentId, DMS: DMS }, null)
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );

        const link = document.createElement("a");
        if (!newTab) {
          link.href = downloadUrl;
          const file_name: string = response.headers["file_name"]!;
          link.setAttribute("download", file_name); //any other extension

          document.body.appendChild(link);

          link.click();

          link.remove();
        } else {
          let newWindow = window.open("/")!;
          newWindow.onload = () => {
            newWindow.location = window.URL.createObjectURL(
              new Blob([response.data], {
                type: response.headers["content_type"],
              })
            );
          };
        }
      })
      .catch((error) => {
        if (error?.response?.data) {
        } else {
        }
      });
  };
};

export const uploadCMISfile = async (formData) => {
  const uploadURL = API.DMS_API + "/uploadDocument";

  try {
    let response = await httpPOSTRequest(
      uploadURL,
      formData,
      null,
      true,
      true,
      null
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateCMISdocument = (id, file, fileName, description, DMS) => {
  const updateURL = API.DMS_API + "/dms" + DMS + "/update";
  let formData = {
    upload: file,
    id: id,
    name: fileName ? fileName : file.name,
    nodeType: "cm:content",
    "cm:title": "My text",
    "cm:description": description,
    relativePath: "Uploads",
    majorVersion: true,
    comment: "test",
    DMS: DMS,
  };
  let bodyFormData = new FormData();
  for (let key in formData) {
    bodyFormData.append(key, formData[key]);
  }
  return httpPUTRequest(updateURL, bodyFormData, null)
    .then((res) => {
      if (res.data) {
      } else {
      }
    })
    .catch((error) => {
      if (error?.response?.data) {
      } else {
      }
    });
};
