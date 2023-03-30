//
//  StandDetailView.swift
//  AppFimu
//
//  Created by user235496 on 3/15/23.
//

import SwiftUI

struct StandDetailView: View {
    
    var stand: Stand
    
    var body: some View {
        NavigationView{
            VStack(alignment: .leading){
               Text("Les  services proposés sont :  ")
                   .bold()
                   .font(.system(size:20))
                   .padding(25)
               
               List {
                   ForEach(stand.services ,content: { element in
                       Text("\(element.libelle)")
                           .padding(10)
                   })
               }
               .listStyle(.inset)
               .navigationTitle("\(stand.libelle)")
                
            }
        }
    }
}

struct StandDetailView_Previews: PreviewProvider {
    static var previews: some View {
        StandDetailView(stand:
        Stand(id: 1, libelle: "Stand 1", latitude: 53.856614, longitude: 19.3522219, typestand: TypeStand(id: 2, libelle: "Bar"),
            services: [ Service(id: 4, libelle: "Vodk"),
                        Service(id: 5, libelle: "Cocktails")
                      ]
             )
        )
    }
}
