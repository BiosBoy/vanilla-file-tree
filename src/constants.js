const data = [
  {
    folder: true,
    title: "Icons",
    children: [
      {
        title: "logo.png"
      },
      {
        folder: true,
        title: "Vacations 1",
        children: [
          {
            folder: true,
            title: "Mary",
            children: [
              {
                title: "logo.png"
              },
              {
                folder: true,
                title: "Volander",
                children: [
                  {
                    title: "spain.jpeg"
                  },
                  {
                    folder: true,
                    title: "Potter"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        folder: true,
        title: "Vacations 2",
        children: [
          {
            folder: true,
            title: "Mary",
            children: [
              {
                title: "logo.png"
              },
              {
                folder: true,
                title: "Volander",
                children: [
                  {
                    title: "spain.jpeg"
                  },
                  {
                    folder: true,
                    title: "Potter"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    folder: true,
    title: "Work",
    children: [
      {
        folder: true,
        title: "screenshots",
        children: null
      }
    ]
  },
  {
    folder: true,
    title: "Personal",
    children: [
      {
        folder: true,
        title: "JS",
        children: null
      },
      {
        title: "nvm-setup.exe"
      },
      {
        title: "node.exe"
      }
    ]
  },
  {
    title: "index.txt"
  }
];

const ROOT_NODE = document.getElementById("root");

export default data;
export { ROOT_NODE };
