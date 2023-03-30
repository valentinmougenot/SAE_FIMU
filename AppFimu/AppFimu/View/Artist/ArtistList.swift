//
//  ArtistList.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import SwiftUI

struct ArtistList: View {
    @State var selectedFilter: Int = 0
    @State var selectedPays: Int = 0
    @State var selectedCategorie: Int = 0
    @State var selectedGenre: Int = 0
    @State var selectedDate: Int = 0
    @State var showFilters: Bool = false
    @EnvironmentObject var data: ArtistViewModel
    @EnvironmentObject var dataPays: CountryViewModel
    @EnvironmentObject var dataCategorie: CategoryViewModel
    @EnvironmentObject var dataGenre: GenreViewModel
    @EnvironmentObject var dataDate: DateViewModel

    var sortedArtists: [Artist] {
        switch selectedFilter {
        case 0:
            return data.artistes.sorted { $0.nom.lowercased() < $1.nom.lowercased() }
        case 1:
            /*return data.artistes.sorted { $0.concerts[0].date_debut == $1.concerts[0].date_debut ? $0.concerts[0].heure_debut < $1.concerts[0].heure_debut : $0.concerts[0].date_debut < $1.concerts[0].date_debut}*/
            return data.artistes.sorted { $0.categorie.libelle.lowercased() > $1.categorie.libelle.lowercased() }
        case 2:
            return data.artistes.filter { $0.isFavorite }
        default:
            return data.artistes
        }
    }

    var body: some View {
        NavigationView {
            List(filterArtists(), id: \.id) { artist in
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
                        Text("Par catégorie").tag(1)
                        Text("Mes favoris").tag(2)
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)
                }

                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        showFilters.toggle()
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                }
            }
        }
        .sheet(isPresented: $showFilters) {
            VStack {
                HStack {
                    Text("Pays")
                    Spacer()
                    Picker("FiltrePays", selection: $selectedPays) {
                        Text("Tout").tag(0)
                        ForEach(dataPays.pays) { pays in
                            Text(pays.libelle).tag(pays.id)
                        }
                    }
                }
                HStack {
                    Text("Catégorie")
                    Spacer()
                    Picker("FiltreCategorie", selection: $selectedCategorie) {
                        Text("Tout").tag(0)
                        ForEach(dataCategorie.categories) { categorie in
                            Text(categorie.libelle).tag(categorie.id)
                        }
                    }
                }
                HStack {
                    Text("Genre")
                    Spacer()
                    Picker("FiltreGenre", selection: $selectedGenre) {
                        Text("Tout").tag(0)
                        ForEach(dataGenre.genres) { genre in
                            Text(genre.libelle).tag(genre.id)
                        }
                    }
                }
                HStack {
                    Text("Jour")
                    Spacer()
                    Picker("FiltreJour", selection: $selectedDate) {
                        Text("Tout").tag(0)
                        ForEach(dataDate.dates) { date in
                            Text(date.date_debut).tag(date.id)
                        }
                    }
                }
            }
            .presentationDetents([.fraction(0.3), .fraction(0.5)])
        }
    }
    
    func filterArtists() -> [Artist] {
        var filteredArtists: [Artist] = sortedArtists
        if selectedPays != 0 {
            filteredArtists = filteredArtists.filter { artist in
                for pays in artist.pays {
                    if pays.id == selectedPays {
                        return true
                    }
                }
                return false
            }
        }
        if selectedCategorie != 0 {
            filteredArtists = filteredArtists.filter { artist in
                return artist.categorie.id == selectedCategorie
            }
        }
        if selectedGenre != 0 {
            filteredArtists = filteredArtists.filter { artist in
                for genre in artist.genres {
                    if genre.id == selectedGenre {
                        return true
                    }
                }
                return false
            }
        }
        if selectedDate != 0 {
            filteredArtists = filteredArtists.filter { artist in
                for concert in artist.concerts {
                    if concert.date_debut == dataDate.dates.first(where: {$0.id == selectedDate})!.date_debut {
                        return true
                    }
                }
                return false
            }
        }
        
        return filteredArtists
    }
}

struct ArtistList_Previews: PreviewProvider {
    static var previews: some View {
        ArtistList()
            .environmentObject(ArtistViewModel())
    }
}
