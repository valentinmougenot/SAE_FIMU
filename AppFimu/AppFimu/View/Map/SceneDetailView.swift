//
//  SceneDetailView.swift
//  AppFimu
//
//  Created by valentin mougenot on 30/03/2023.
//

import SwiftUI

struct SceneDetailView: View {
    var scene: Scenes
    
    var body: some View {
        NavigationView{
            VStack(alignment: .leading){
                Text("Type de scène: \(scene.typescene.libelle)")
                   .bold()
                   .font(.system(size:20))
                   .padding(25)
               .listStyle(.inset)
               .navigationTitle("\(scene.libelle)")
            }
        }
    }
}

/*struct SceneDetailView_Previews: PreviewProvider {
    static var previews: some View {
        SceneDetailView()
    }
}*/
