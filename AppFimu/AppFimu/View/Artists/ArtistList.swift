//
//  ArtistList.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import SwiftUI

struct ArtistList: View {
    @State var selectedFilter: Int = 0
    @EnvironmentObject var data: ArtistViewModel

    var filteredArtists: [Artist] {
        switch selectedFilter {
        case 0:
            return data.artistes.sorted { $0.nom.lowercased() < $1.nom.lowercased() }
        case 1:
            return data.artistes.sorted { $0.nom.lowercased() > $1.nom.lowercased() }
        case 2:
            return data.artistes.filter { $0.isFavorite }
        default:
            return data.artistes
        }
    }

    var body: some View {
        NavigationView {
            List(filteredArtists, id: \.id) { artist in
                NavigationLink(destination: ArtistDetail(artist: artist).environmentObject(data)) {
                    ArtistRow(artist: artist)
                }
            }
            .listStyle(.inset)
            .navigationTitle("Artistes")
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Picker("Filter", selection: $selectedFilter) {
                        Text("A-Z").tag(0)
                        Text("Par jour").tag(1)
                        Text("Mes favoris").tag(2)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)
                }

                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {

                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                }
            }
        }
    }
}

struct ArtistList_Previews: PreviewProvider {
    static var previews: some View {
        ArtistList()
            .environmentObject(ArtistViewModel())
    }
}

struct Filter: Identifiable {
    var id = UUID()
    var name: String
}

